<!-- ChatSettings.vue -->
<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl w-[480px] max-h-[90vh] flex flex-col shadow-xl">
      <!-- 설정 헤더 -->
      <div class="p-4 border-b border-gray-100 flex items-center justify-between shrink-0">
        <h3 class="text-lg font-semibold">설정</h3>
        <button @click="$emit('close')" class="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- 설정 컨텐츠 -->
      <div class="p-4 overflow-y-auto flex-1">
        <!-- 디바이스 설정 -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold text-gray-900 mb-3">디바이스 설정</h4>
          <div class="space-y-4">
            <!-- 카메라 선택 -->
            <div>
              <label class="block text-sm text-gray-700 mb-1">카메라</label>
              <template v-if="videoDevices.length > 1">
                <select v-model="selectedCamera" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option v-for="device in videoDevices" :key="device.deviceId" :value="device.deviceId">
                    {{ device.label || `카메라 ${device.deviceId.slice(0, 4)}` }}
                  </option>
                </select>
              </template>
              <template v-else-if="videoDevices.length === 1">
                <div class="w-full px-3 py-2 border border-gray-100 rounded-lg bg-gray-50 text-gray-600">
                  {{ videoDevices[0].label || '기본 카메라' }}
                </div>
              </template>
              <template v-else>
                <div class="w-full px-3 py-2 border border-gray-100 rounded-lg bg-gray-50 text-gray-500">
                  사용 가능한 카메라가 없습니다
                </div>
              </template>
            </div>
            
            <!-- 마이크 선택 -->
            <div>
              <label class="block text-sm text-gray-700 mb-1">마이크</label>
              <template v-if="audioDevices.length > 1">
                <select v-model="selectedMicrophone" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option v-for="device in audioDevices" :key="device.deviceId" :value="device.deviceId">
                    {{ device.label || `마이크 ${device.deviceId.slice(0, 4)}` }}
                  </option>
                </select>
              </template>
              <template v-else-if="audioDevices.length === 1">
                <div class="w-full px-3 py-2 border border-gray-100 rounded-lg bg-gray-50 text-gray-600">
                  {{ audioDevices[0].label || '기본 마이크' }}
                </div>
              </template>
              <template v-else>
                <div class="w-full px-3 py-2 border border-gray-100 rounded-lg bg-gray-50 text-gray-500">
                  사용 가능한 마이크가 없습니다
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- 화면 설정 -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold text-gray-900 mb-3">화면 설정</h4>
          <div class="space-y-4">
            <!-- 비디오 품질 -->
            <div>
              <label class="block text-sm text-gray-700 mb-1">비디오 품질</label>
              <select v-model="videoQuality" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="low">저화질 (480p)</option>
                <option value="medium">중화질 (720p)</option>
                <option value="high">고화질 (1080p)</option>
              </select>
            </div>
            <!-- 프레임 레이트 -->
            <div>
              <label class="block text-sm text-gray-700 mb-1">프레임 레이트</label>
              <select v-model="frameRate" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="15">15 fps</option>
                <option value="24">24 fps</option>
                <option value="30">30 fps</option>
                <option value="60">60 fps</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 프로필 설정 -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold text-gray-900 mb-3">프로필 설정</h4>
          <div class="space-y-4">
            <!-- 닉네임 -->
            <div>
              <label class="block text-sm text-gray-700 mb-1">닉네임</label>
              <input v-model="nickname" type="text" placeholder="닉네임을 입력하세요" 
                class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </div>

        <!-- 알림 설정 -->
        <div class="mb-6">
          <h4 class="text-sm font-semibold text-gray-900 mb-3">알림 설정</h4>
          <div class="space-y-4">
            <!-- 채팅 알림 -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-700">채팅 알림</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="chatNotification" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <!-- 참가자 알림 -->
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-700">참가자 알림</span>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" v-model="participantNotification" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- 설정 푸터 -->
      <div class="p-4 border-t border-gray-100 flex justify-end space-x-2 shrink-0">
        <button @click="$emit('close')" 
          class="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors font-medium">
          취소
        </button>
        <button @click="saveSettings" 
          class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm">
          저장
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// Props 정의
const props = defineProps({
  initialStream: {
    type: MediaStream,
    required: true
  }
})

// Emits 정의
const emit = defineEmits(['close', 'update:stream'])

// 상태 관리
const videoDevices = ref([])
const audioDevices = ref([])
const selectedCamera = ref('')
const selectedMicrophone = ref('')
const videoQuality = ref(localStorage.getItem('videoQuality') || 'medium')
const frameRate = ref(localStorage.getItem('frameRate') || '30')
const nickname = ref(localStorage.getItem('nickname') || '')
const chatNotification = ref(localStorage.getItem('chatNotification') !== 'false')
const participantNotification = ref(localStorage.getItem('participantNotification') !== 'false')

// 디바이스 목록 로드
const loadDevices = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    videoDevices.value = devices.filter(device => device.kind === 'videoinput')
    audioDevices.value = devices.filter(device => device.kind === 'audioinput')
    
    // 현재 선택된 디바이스 설정
    const savedCamera = localStorage.getItem('selectedCamera')
    const savedMicrophone = localStorage.getItem('selectedMicrophone')
    
    // 저장된 디바이스가 있고 사용 가능한 경우 해당 디바이스 선택
    if (savedCamera && videoDevices.value.find(d => d.deviceId === savedCamera)) {
      selectedCamera.value = savedCamera
    } else if (videoDevices.value.length > 0) {
      selectedCamera.value = videoDevices.value[0].deviceId
    }
    
    if (savedMicrophone && audioDevices.value.find(d => d.deviceId === savedMicrophone)) {
      selectedMicrophone.value = savedMicrophone
    } else if (audioDevices.value.length > 0) {
      selectedMicrophone.value = audioDevices.value[0].deviceId
    }
  } catch (err) {
    console.error('디바이스 목록 로드 실패:', err)
  }
}

// 비디오 해상도 가져오기
const getVideoResolution = (quality) => {
  switch (quality) {
    case 'low':
      return { width: 640, height: 480 }
    case 'medium':
      return { width: 1280, height: 720 }
    case 'high':
      return { width: 1920, height: 1080 }
    default:
      return { width: 1280, height: 720 }
  }
}

// 설정 저장
const saveSettings = async () => {
  try {
    // 비디오 설정 적용
    const videoConstraints = {
      deviceId: selectedCamera.value,
      ...getVideoResolution(videoQuality.value),
      frameRate: parseInt(frameRate.value)
    }

    // 오디오 설정 적용
    const audioConstraints = {
      deviceId: selectedMicrophone.value,
      echoCancellation: true,
      noiseSuppression: true
    }

    // 새로운 미디어 스트림 가져오기
    const newStream = await navigator.mediaDevices.getUserMedia({
      video: videoConstraints,
      audio: audioConstraints
    })

    // 설정을 localStorage에 저장
    localStorage.setItem('selectedCamera', selectedCamera.value)
    localStorage.setItem('selectedMicrophone', selectedMicrophone.value)
    localStorage.setItem('videoQuality', videoQuality.value)
    localStorage.setItem('frameRate', frameRate.value)
    localStorage.setItem('nickname', nickname.value)
    localStorage.setItem('chatNotification', chatNotification.value)
    localStorage.setItem('participantNotification', participantNotification.value)

    // 새 스트림을 부모 컴포넌트에 전달
    emit('update:stream', newStream)
    
    // 설정 모달 닫기
    emit('close')
  } catch (err) {
    console.error('설정 저장 실패:', err)
    alert('설정 저장 중 오류가 발생했습니다. 다시 시도해주세요.')
  }
}

// 컴포넌트 마운트 시 초기화
onMounted(async () => {
  await loadDevices()
  
  // 알림 권한 요청
  if ("Notification" in window && Notification.permission === "default") {
    await Notification.requestPermission()
  }
})
</script> 