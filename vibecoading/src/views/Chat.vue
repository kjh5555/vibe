<template>
  <div class="h-[calc(100vh-4rem)] bg-gray-50">
    <!-- 채팅 컨테이너 -->
    <div class="max-w-7xl mx-auto h-full p-4">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col">
        <!-- 채팅방 헤더 -->
        <div class="p-4 border-b border-gray-100 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-semibold text-gray-900">화상 채팅방</h2>
              <p class="text-sm text-gray-500">{{ participants }} 명 참가 중</p>
            </div>
          </div>
          <button @click="toggleSettings" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>

        <!-- 메인 컨텐츠 영역 -->
        <div class="flex-1 flex">
          <!-- 비디오 그리드 -->
          <div class="flex-1 p-4 grid grid-cols-2 gap-4 overflow-y-auto border-r border-gray-100">
            <!-- 내 비디오 -->
            <div class="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-sm">
              <video ref="localVideo" autoplay muted class="w-full h-full object-cover"></video>
              <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded-lg">
                <p class="text-white text-sm">나</p>
              </div>
              <div class="absolute bottom-3 right-3 flex space-x-2">
                <button @click="toggleMic" class="p-2 rounded-lg" :class="isMicOn ? 'bg-blue-500' : 'bg-red-500'">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="isMicOn" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
                <button @click="toggleCamera" class="p-2 rounded-lg" :class="isCameraOn ? 'bg-blue-500' : 'bg-red-500'">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path v-if="isCameraOn" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- 상대방 비디오 (연결 시 표시) -->
            <div v-for="peer in peers" :key="peer.id" class="relative aspect-video bg-gray-900 rounded-xl overflow-hidden shadow-sm">
              <video :id="'peerVideo_' + peer.id" autoplay playsinline class="w-full h-full object-cover"></video>
              <div class="absolute bottom-3 left-3 bg-black/50 px-3 py-1 rounded-lg">
                <p class="text-white text-sm">{{ peer.name || '참가자' }}</p>
              </div>
            </div>

            <!-- 대기 중인 슬롯 -->
            <div v-for="n in remainingSlots" :key="'empty-' + n" class="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p class="text-gray-500 text-sm">대기 중...</p>
              </div>
            </div>
          </div>

          <!-- 채팅 영역 -->
          <div class="w-96 flex flex-col">
            <!-- 채팅 메시지 영역 -->
            <div class="flex-1 p-4 overflow-y-auto" ref="chatContainer">
              <div v-if="messages.length === 0" class="flex items-center justify-center h-full">
                <p class="text-gray-500">채팅이 없습니다.</p>
              </div>
              <div v-else class="space-y-3">
                <div v-for="message in messages" :key="message.time">
                  <!-- 파일 메시지 -->
                  <FileMessage
                    v-if="message.type === 'file'"
                    :file="message"
                    :is-mine="message.sender === nickname.value"
                    :time="message.time"
                    :socket="socket"
                  />
                  <!-- 일반 텍스트 메시지 -->
                  <div v-else class="flex" :class="message.sender === nickname.value ? 'justify-end' : 'justify-start'">
                    <div class="max-w-[80%] rounded-lg p-3" 
                      :class="message.sender === nickname.value ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'"
                    >
                      <div v-if="message.sender !== nickname.value" class="text-xs text-gray-500 mb-1">{{ message.sender }}</div>
                      <div>{{ message.text }}</div>
                      <div class="text-xs mt-1" :class="message.sender === nickname.value ? 'text-blue-100' : 'text-gray-500'">
                        {{ message.time }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 채팅 입력 영역 -->
            <div class="p-4 border-t border-gray-100">
              <div class="flex items-center space-x-2">
                <FileUpload
                  @file-selected="handleFileSelected"
                  @upload-error="handleUploadError"
                />
                <input
                  v-model="messageInput"
                  type="text"
                  placeholder="메시지를 입력하세요..."
                  class="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  @keyup.enter="sendMessage"
                >
                <button
                  @click="sendMessage"
                  class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  전송
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 하단 컨트롤 -->
        <div class="p-4 border-t border-gray-100 flex items-center justify-between">
          <div class="flex space-x-2">
            <button @click="toggleMic" class="flex items-center space-x-2 px-4 py-2 rounded-lg" :class="isMicOn ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="isMicOn" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              </svg>
              <span>{{ isMicOn ? '마이크 켜짐' : '마이크 꺼짐' }}</span>
            </button>
            <button @click="toggleCamera" class="flex items-center space-x-2 px-4 py-2 rounded-lg" :class="isCameraOn ? 'bg-blue-500 text-white' : 'bg-red-500 text-white'">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="isCameraOn" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <span>{{ isCameraOn ? '카메라 켜짐' : '카메라 꺼짐' }}</span>
            </button>
          </div>
          <button @click="leaveRoom" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>나가기</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 설정 모달 -->
    <ChatSettings
      v-if="isSettingsOpen"
      :initial-stream="localStream"
      @close="toggleSettings"
      @update:stream="handleStreamUpdate"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { io } from 'socket.io-client'
import Peer from 'peerjs'
import ChatSettings from '../components/ChatSettings.vue'
import FileUpload from '../components/FileUpload.vue'
import FileMessage from '../components/FileMessage.vue'

const router = useRouter()
const socket = io('http://localhost:3000', {
  reconnectionDelayMax: 5000,
  reconnectionAttempts: Infinity,
  timeout: 20000
})

const props = defineProps({
  roomId: {
    type: String,
    required: true
  }
})

// 채팅방 정보
const room = ref(null)

// 채팅방 정보 요청
const fetchRoomInfo = () => {
  socket.emit('join-room', { roomId: props.roomId }, (success) => {
    if (!success) {
      alert('채팅방에 참여할 수 없습니다.')
      router.push('/')
    }
  })
}

// 연결 상태 관리
const isConnected = ref(false)
const connectionAttempts = ref(0)

// PeerJS 설정 수정
const initializePeer = () => {
  const newPeer = new Peer(undefined, {
    host: 'localhost',
    port: 3000,
    path: '/',
    debug: 3,
    config: {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' }
      ]
    }
  })

  newPeer.on('open', (id) => {
    console.log('PeerJS 연결 성공. 내 ID:', id)
    // 연결 성공 시 서버에 ID 전송
    if (isConnected.value) {
      socket.emit('peer-id', id)
    }
  })

  return newPeer
}

const localVideo = ref(null)
const isMicOn = ref(true)
const isCameraOn = ref(true)
const peers = ref([])
const maxParticipants = 4
const messages = ref([])
const messageInput = ref('')
const chatContainer = ref(null)
const peerVideos = ref({})

// 로컬 스트림 저장
let localStream = null

// 소켓 연결 이벤트 처리
socket.on('connect', () => {
  console.log('Socket.IO 연결 성공')
  isConnected.value = true
  connectionAttempts.value = 0
})

socket.on('disconnect', () => {
  console.log('Socket.IO 연결 끊김')
  isConnected.value = false
  // 연결이 끊어지면 피어 목록 초기화
  peers.value = []
})

socket.on('connect_error', (error) => {
  console.error('Socket.IO 연결 에러:', error)
  connectionAttempts.value++
})

// 설정 상태 추가
const isSettingsOpen = ref(false)
const nickname = ref(localStorage.getItem('nickname') || '나')
const chatNotification = ref(localStorage.getItem('chatNotification') !== 'false')
const participantNotification = ref(localStorage.getItem('participantNotification') !== 'false')

// 알림 표시 함수
const showNotification = (title, body) => {
  if (!("Notification" in window)) {
    return;
  }

  if (Notification.permission === "granted") {
    new Notification(title, { body });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(title, { body });
      }
    });
  }
}

// 스트림 업데이트 핸들러
const handleStreamUpdate = async (newStream) => {
  // 기존 스트림 정리
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop())
  }
  
  // 새 스트림 설정
  localStream = newStream
  if (localVideo.value) {
    localVideo.value.srcObject = newStream
  }

  // 연결된 모든 피어에게 새 스트림 전송
  peers.value.forEach(peerData => {
    const call = peer.call(peerData.id, newStream)
    handleCall(call)
  })
}

// 스크롤을 최하단으로 이동하는 함수
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

// 채팅 메시지 수신 함수 수정
const receiveMessage = (text, sender) => {
  console.log('메시지 수신 처리:', { text, sender })
  const message = {
    id: Date.now(),
    type: 'text',
    text,
    sender,
    time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }

  messages.value.push(message)

  // 채팅 알림 설정이 켜져 있을 때만 알림 표시
  if (chatNotification.value && document.hidden) {
    showNotification('새 메시지', `${sender}: ${text}`)
  }

  scrollToBottom()
}

// 소켓 이벤트 리스너 수정
socket.on('peer-joined', async (newPeerId) => {
  console.log('새로운 피어 참가:', newPeerId)
  
  // 참가자 알림 설정이 켜져 있을 때만 알림 표시
  if (participantNotification.value) {
    showNotification('새 참가자', '새로운 참가자가 입장했습니다.')
  }

  // 1초 대기 후 호출 시도
  setTimeout(async () => {
    try {
      if (localStream) {
        console.log('로컬 스트림으로 호출 시도:', newPeerId)
        const call = peer.call(newPeerId, localStream)
        handleCall(call)
      }
    } catch (err) {
      console.error('피어 연결 오류:', err)
    }
  }, 2000)
})

socket.on('peer-left', (peerId) => {
  console.log('피어 퇴장:', peerId)
  peers.value = peers.value.filter(p => p.id !== peerId)
  
  // 참가자 알림 설정이 켜져 있을 때만 알림 표시
  if (participantNotification.value) {
    showNotification('참가자 퇴장', '참가자가 퇴장했습니다.')
  }
})

// PeerJS 연결 상태 모니터링
const peer = initializePeer()

peer.on('error', (error) => {
  console.error('PeerJS 에러:', error)
})

// 참가자 수 계산
const participants = computed(() => peers.value.length + 1)
const remainingSlots = computed(() => maxParticipants - participants.value)

// 설정 토글 함수
const toggleSettings = () => {
  isSettingsOpen.value = !isSettingsOpen.value
}

// 호출 처리 함수 수정
const handleCall = async (call) => {
  console.log('호출 처리 시작:', call.peer)
  
  try {
    // 연결 상태 모니터링
    const conn = peer.connect(call.peer, {
      reliable: true
    })
    
    conn.on('open', () => {
      console.log('데이터 채널 연결됨:', call.peer)
      // 연결 상태 확인을 위한 ping 전송
      conn.send({ type: 'PING', timestamp: Date.now() })
    })

    conn.on('data', (data) => {
      console.log('데이터 수신:', data)
    })

    conn.on('error', (err) => {
      console.error('데이터 채널 에러:', err)
    })
    
    // 스트림 이벤트 처리
    call.on('stream', (remoteStream) => {
      console.log('원격 스트림 수신:', call.peer, remoteStream.id)
      console.log('원격 스트림 트랙:', remoteStream.getTracks())
      
      // 이미 존재하는 피어인지 확인
      if (!peers.value.find(p => p.id === call.peer)) {
        peers.value.push({
          id: call.peer,
          stream: remoteStream
        })
        
        // 다음 틱에서 비디오 엘리먼트에 스트림 연결
        nextTick(() => {
          const videoEl = document.getElementById(`peerVideo_${call.peer}`)
          if (videoEl) {
            console.log('비디오 엘리먼트 찾음:', `peerVideo_${call.peer}`)
            videoEl.srcObject = remoteStream
            videoEl.play()
              .then(() => console.log('원격 비디오 재생 시작'))
              .catch(err => console.error('비디오 재생 오류:', err))
          } else {
            console.error('비디오 엘리먼트를 찾을 수 없음:', `peerVideo_${call.peer}`)
          }
        })
      }
    })

    call.on('error', (err) => {
      console.error('호출 에러:', err)
    })

    call.on('close', () => {
      console.log('피어 연결 종료:', call.peer)
      peers.value = peers.value.filter(p => p.id !== call.peer)
      conn.close()
    })

  } catch (err) {
    console.error('handleCall 에러:', err)
  }
}

// 컴포넌트 마운트 시 미디어 접근 권한 요청 및 연결 설정
onMounted(async () => {
  try {
    await fetchRoomInfo()
    
    console.log('미디어 스트림 요청 시작')
    
    // 저장된 설정 불러오기
    const savedQuality = localStorage.getItem('videoQuality') || 'medium'
    const savedFrameRate = parseInt(localStorage.getItem('frameRate') || '30')
    
    // 비디오 해상도 설정
    const videoConstraints = {
      width: savedQuality === 'high' ? 1920 : savedQuality === 'medium' ? 1280 : 640,
      height: savedQuality === 'high' ? 1080 : savedQuality === 'medium' ? 720 : 480,
      frameRate: { ideal: savedFrameRate },
      facingMode: 'user'
    }

    // 미디어 스트림 가져오기
    localStream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: {
        echoCancellation: true,
        noiseSuppression: true
      }
    })
    
    console.log('로컬 스트림 획득:', localStream.id)
    console.log('로컬 스트림 트랙:', localStream.getTracks())
    
    if (localVideo.value) {
      console.log('로컬 비디오 엘리먼트에 스트림 연결')
      localVideo.value.srcObject = localStream
      await localVideo.value.play()
      console.log('로컬 비디오 재생 시작')
    }

    // PeerJS 초기화
    const peer = initializePeer()

    // 다른 피어로부터의 호출 처리
    peer.on('call', (call) => {
      console.log('호출 수신:', call.peer)
      // 3초 대기 후 응답
      setTimeout(() => {
        console.log('호출 응답:', call.peer)
        call.answer(localStream)
        handleCall(call)
      }, 1000)
    })

    // 연결 요청 처리
    peer.on('connection', (conn) => {
      console.log('데이터 채널 연결 요청:', conn.peer)
      
      conn.on('open', () => {
        console.log('데이터 채널 열림:', conn.peer)
      })
      
      conn.on('data', (data) => {
        console.log('데이터 수신:', data)
        if (data.type === 'FILE_REQUEST') {
          const fileData = fileStorage.get(data.fileId)
          if (fileData) {
            conn.send({
              type: 'FILE_DATA',
              fileId: data.fileId,
              base64: fileData
            })
          }
        }
      })
      
      conn.on('error', (err) => {
        console.error('데이터 채널 에러:', err)
      })
    })

    // 에러 처리
    peer.on('error', (err) => {
      console.error('PeerJS 에러:', err)
      if (err.type === 'peer-unavailable') {
        console.log('피어를 찾을 수 없음:', err.peer)
      }
    })

    // 연결 해제 처리
    peer.on('disconnected', () => {
      console.log('PeerJS 연결 해제됨')
      peer.reconnect()
    })

  } catch (err) {
    console.error('미디어 접근 오류:', err)
    alert('카메라 또는 마이크 접근 권한이 필요합니다.')
  }
})

// 컴포넌트 언마운트 시 연결 정리
onUnmounted(() => {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop())
  }
  peers.value.forEach(peer => {
    if (peer.stream) {
      peer.stream.getTracks().forEach(track => track.stop())
    }
  })
  socket.disconnect()
  peer.destroy()
})

// 마이크 토글
const toggleMic = () => {
  if (localStream) {
    const audioTrack = localStream.getAudioTracks()[0]
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled
      isMicOn.value = audioTrack.enabled
    }
  }
}

// 카메라 토글
const toggleCamera = () => {
  if (localStream) {
    const videoTrack = localStream.getVideoTracks()[0]
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled
      isCameraOn.value = videoTrack.enabled
    }
  }
}

// 방 나가기
const leaveRoom = () => {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop())
  }
  socket.disconnect()
  peer.destroy()
  router.push('/')
}

// 채팅 메시지 전송 함수 수정
const sendMessage = async () => {
  if (!messageInput.value.trim()) return

  const messageText = messageInput.value.trim()
  const message = {
    id: Date.now(),
    type: 'text',
    text: messageText,
    sender: nickname.value,
    time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }

  // 메시지를 로컬에 추가
  messages.value.push(message)
  
  // 서버로 메시지 전송
  socket.emit('chat-message', {
    type: 'text',
    message: messageText,
    senderName: nickname.value,
    timestamp: Date.now()
  })

  // 입력창 초기화
  messageInput.value = ''
  
  scrollToBottom()
}

// 파일 전송 처리
const handleFileSelected = async (fileData) => {
  const fileMessage = {
    id: Date.now(),
    type: 'file',
    name: fileData.name,
    size: fileData.size,
    fileType: fileData.type,
    fileData: fileData.base64,  // 파일 데이터 포함
    sender: nickname.value,
    time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
  }
  
  // 메시지를 로컬에 추가
  messages.value.push(fileMessage)
  
  // 서버로 파일 메시지 전송
  socket.emit('chat-message', {
    type: 'file',
    message: {
      name: fileData.name,
      size: fileData.size,
      type: fileData.type,
      fileData: fileData.base64  // 파일 데이터 포함
    },
    senderName: nickname.value,
    timestamp: Date.now()
  })
  
  scrollToBottom()
}

// 파일 스토리지
const fileStorage = new Map()

// 파일 수신 처리
const handleFileReceived = (updatedFile) => {
  const index = messages.value.findIndex(m => m.id === updatedFile.id)
  if (index !== -1) {
    messages.value[index] = updatedFile
  }
}

// 소켓 이벤트 리스너 수정
socket.on('chat-message', (data) => {
  if (data.type === 'file') {
    // 파일 메시지인 경우
    const fileMessage = {
      id: Date.now(),
      type: 'file',
      name: data.message.name,
      size: data.message.size,
      fileType: data.message.type,
      fileData: data.message.fileData,  // 파일 데이터 포함
      sender: data.senderName || '참가자',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }
    messages.value.push(fileMessage)
  } else {
    // 일반 텍스트 메시지인 경우
    const message = {
      id: Date.now(),
      type: 'text',
      text: data.message,
      sender: data.senderName || '참가자',
      time: new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })
    }
    messages.value.push(message)
  }
  
  scrollToBottom()
})

// 파일 업로드 에러 처리
const handleUploadError = (error) => {
  alert(error)
}
</script>

<style scoped>
/* 스크롤바 스타일링 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background-color: #e5e7eb;
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background-color: #d1d5db;
}
</style> 