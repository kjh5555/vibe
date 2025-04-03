<!-- FileUpload.vue -->
<template>
  <div class="relative">
    <!-- 파일 업로드 버튼 -->
    <button 
      @click="triggerFileInput"
      class="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 relative"
      :class="{ 'animate-pulse': isDragging }"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="handleDrop"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <input 
        type="file" 
        ref="fileInput" 
        class="hidden" 
        @change="handleFileSelect" 
        :accept="allowedTypes.join(',')"
        multiple
      >
    </button>

    <!-- 업로드 진행 상태 -->
    <div v-if="isUploading" class="absolute bottom-full mb-2 left-0 bg-white rounded-lg shadow-lg p-2 min-w-[200px]">
      <div class="text-sm text-gray-600 mb-1">{{ currentFile.name }}</div>
      <div class="h-1 bg-gray-100 rounded-full overflow-hidden">
        <div 
          class="h-full bg-blue-500 transition-all duration-300" 
          :style="{ width: `${uploadProgress}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  maxFileSize: {
    type: Number,
    default: 10 * 1024 * 1024 // 10MB
  },
  allowedTypes: {
    type: Array,
    default: () => ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png', '.gif']
  }
})

// Emits
const emit = defineEmits(['file-selected', 'upload-error'])

// Refs
const fileInput = ref(null)
const isDragging = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const currentFile = ref(null)

// 파일 입력 트리거
const triggerFileInput = () => {
  fileInput.value?.click()
}

// 파일 크기 검증
const validateFileSize = (file) => {
  if (file.size > props.maxFileSize) {
    emit('upload-error', `파일 크기는 ${Math.floor(props.maxFileSize / 1024 / 1024)}MB를 초과할 수 없습니다.`)
    return false
  }
  return true
}

// 파일 형식 검증
const validateFileType = (file) => {
  const fileExtension = '.' + file.name.split('.').pop().toLowerCase()
  if (!props.allowedTypes.includes(fileExtension)) {
    emit('upload-error', '지원하지 않는 파일 형식입니다.')
    return false
  }
  return true
}

// 파일 선택 처리
const handleFileSelect = (event) => {
  const files = Array.from(event.target.files)
  processFiles(files)
}

// 드래그 앤 드롭 처리
const handleDrop = (event) => {
  isDragging.value = false
  const files = Array.from(event.dataTransfer.files)
  processFiles(files)
}

// 파일 처리
const processFiles = (files) => {
  files.forEach(file => {
    if (validateFileSize(file) && validateFileType(file)) {
      handleFileUpload(file)
    }
  })
}

// 파일 업로드 처리
const handleFileUpload = async (file) => {
  isUploading.value = true
  currentFile.value = file
  uploadProgress.value = 0

  try {
    // 파일을 Base64로 변환
    const base64 = await fileToBase64(file)
    
    // 업로드 진행 상태 시뮬레이션
    const duration = 1000
    const interval = 100
    const steps = duration / interval
    let currentStep = 0

    const progressInterval = setInterval(() => {
      currentStep++
      uploadProgress.value = (currentStep / steps) * 100

      if (currentStep >= steps) {
        clearInterval(progressInterval)
        isUploading.value = false
        emit('file-selected', {
          name: file.name,
          size: file.size,
          type: file.type,
          base64: base64
        })
      }
    }, interval)
  } catch (error) {
    console.error('파일 처리 중 오류:', error)
    emit('upload-error', '파일 처리 중 오류가 발생했습니다.')
    isUploading.value = false
  }
}

// 파일을 Base64로 변환
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
</script> 