<template>
  <div class="video-chat">
    <div class="header">
      <h1>화상 채팅</h1>
      <div class="status-indicator" :class="{ 'connected': isInCall }">
        {{ isInCall ? '통화 중' : '대기 중' }}
      </div>
    </div>

    <div class="main-content">
      <div class="video-section">
        <div class="video-container">
          <div class="video-wrapper local">
            <video ref="localVideo" autoplay muted playsinline></video>
            <div class="video-label">나</div>
          </div>
          <div class="video-wrapper remote">
            <video ref="remoteVideo" autoplay playsinline></video>
            <div class="video-label">상대방</div>
          </div>
        </div>
        <div class="controls">
          <button @click="startCall" :disabled="isInCall" class="btn-primary">
            <span class="icon">📞</span>
            통화 시작
          </button>
          <button @click="endCall" :disabled="!isInCall" class="btn-danger">
            <span class="icon">❌</span>
            통화 종료
          </button>
        </div>
      </div>

      <div class="chat-section">
        <div class="chat-header">
          <h2>채팅</h2>
          <div class="chat-status" v-if="isInCall">
            <span class="status-dot"></span>
            실시간 채팅 중
          </div>
        </div>
        <!-- messages 컨테이너의 ref를 messagesContainer로 변경 -->
        <div class="messages" ref="messagesContainer">
          <div v-if="messages.length === 0" class="no-messages">
            채팅을 시작해보세요!
          </div>
          <div v-else v-for="(message, index) in messages" :key="index" 
               :class="['message', message.type]">
            <div class="message-content">
              {{ message.content }}
            </div>
            <div class="message-time">
              {{ message.timestamp }}
            </div>
          </div>
        </div>
        <div class="input-container">
          <input 
            v-model="newMessage" 
            @keyup.enter="sendMessage" 
            placeholder="메시지를 입력하세요..." 
            :disabled="!isInCall"
            @input="handleInput"
          />
          <button @click="sendMessage" :disabled="!isInCall || !newMessage.trim()" class="btn-send">
            <span class="icon">📤</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick, reactive, watch } from 'vue'
import { Peer } from 'peerjs'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')
const localVideo = ref(null)
const remoteVideo = ref(null)
const messages = ref([])
const newMessage = ref('')
const isInCall = ref(false)
const messagesContainer = ref(null)
let peer = null
let localStream = null
let currentCall = null

// 메시지 스크롤을 항상 아래로 유지
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 입력 처리: 길이 제한 적용
const handleInput = () => {
  if (newMessage.value.length > 500) {
    newMessage.value = newMessage.value.slice(0, 500)
  }
}

// 메시지 추가 함수 (새 메시지를 배열에 누적)
const addMessage = (content, type) => {
  const message = {
    content,
    type,
    timestamp: new Date().toLocaleTimeString()
  }
  messages.value.push(message)
  console.log('메시지 추가됨:', message)
  scrollToBottom()
}

onMounted(async () => {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    })
    
    if (localVideo.value) {
      localVideo.value.srcObject = localStream
    }

    peer = new Peer(undefined, {
      host: 'localhost',
      port: 3000,
      path: '/peerjs'
    })

    peer.on('open', (id) => {
      console.log('내 피어 ID:', id)
      socket.emit('peer-id', id)
    })

    peer.on('call', async (call) => {
      currentCall = call
      call.answer(localStream)
      
      call.on('stream', (remoteStream) => {
        remoteVideo.value.srcObject = remoteStream
        isInCall.value = true
        addMessage('상대방과 연결되었습니다.', 'system')
      })
    })

    socket.on('chat-message', handleChatMessage)
    socket.on('peer-id', handlePeerConnection)
  } catch (error) {
    console.error('Error:', error)
    addMessage('카메라/마이크 접근 권한이 필요합니다.', 'system')
  }
})

onUnmounted(() => {
  if (localStream) {
    localStream.getTracks().forEach(track => track.stop())
  }
  if (currentCall) {
    currentCall.close()
  }
  if (peer) {
    peer.destroy()
  }
  socket.disconnect()
})

const handlePeerConnection = async (remotePeerId) => {
  if (remotePeerId && peer) {
    try {
      currentCall = peer.call(remotePeerId, localStream)
      
      currentCall.on('stream', (remoteStream) => {
        remoteVideo.value.srcObject = remoteStream
        isInCall.value = true
        addMessage('상대방과 연결되었습니다.', 'system')
      })
    } catch (error) {
      console.error('Error making call:', error)
      addMessage('연결에 실패했습니다. 다시 시도해주세요.', 'system')
    }
  }
}

const startCall = () => {
  socket.emit('request-peer-id')
  addMessage('통화 연결을 시도합니다...', 'system')
}

const endCall = () => {
  if (currentCall) {
    currentCall.close()
    currentCall = null
  }
  if (remoteVideo.value) {
    remoteVideo.value.srcObject = null
  }
  isInCall.value = false
  addMessage('통화가 종료되었습니다.', 'system')
}

const sendMessage = () => {
  if (newMessage.value.trim()) {
    addMessage(newMessage.value, 'sent')
    socket.emit('chat-message', newMessage.value)
    newMessage.value = ''
  }
}

const handleChatMessage = (message) => {
  addMessage(message, 'received')
}
</script>

<style lang="scss">
@import '../styles/main.scss';
</style> 