<!-- FileMessage.vue -->
<template>
  <div 
    class="flex" 
    :class="isMine ? 'justify-end' : 'justify-start'"
  >
    <div 
      class="max-w-[80%] rounded-lg p-3 flex items-center space-x-3"
      :class="isMine ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'"
    >
      <!-- 파일 아이콘 -->
      <div class="shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          :class="isMine ? 'text-blue-100' : 'text-gray-400'"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      </div>

      <!-- 파일 정보 -->
      <div class="min-w-0 flex-1">
        <div v-if="!isMine" class="text-xs text-gray-500 mb-1">{{ file.sender }}</div>
        <div class="text-sm font-medium truncate">{{ file.name }}</div>
        <div class="text-xs mt-1" :class="isMine ? 'text-blue-100' : 'text-gray-500'">
          {{ formatFileSize(file.size) }}
        </div>
        <div class="mt-2 flex items-center space-x-2">
          <button 
            v-if="!isMine && !isDownloading && file.fileData"
            @click="downloadFile"
            class="text-xs px-2 py-1 rounded"
            :class="isMine ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'"
          >
            다운로드
          </button>
          <div v-if="isDownloading" class="text-xs" :class="isMine ? 'text-blue-100' : 'text-gray-500'">
            다운로드 중...
          </div>
          <div class="text-xs" :class="isMine ? 'text-blue-100' : 'text-gray-500'">
            {{ time }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  file: {
    type: Object,
    required: true
  },
  isMine: {
    type: Boolean,
    default: false
  },
  time: {
    type: String,
    required: true
  },
  socket: {
    type: Object,
    required: true
  }
})

const isDownloading = ref(false)

// 파일 크기 포맷
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

// 파일 다운로드
const downloadFile = () => {
  if (!props.file.fileData) return
  
  try {
    // Base64 데이터를 Blob으로 변환
    const base64Data = props.file.fileData.split(',')[1]
    const binaryString = window.atob(base64Data)
    const bytes = new Uint8Array(binaryString.length)
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    const blob = new Blob([bytes], { type: props.file.type })
    
    // Blob URL 생성 및 다운로드
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = props.file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('파일 다운로드 중 오류:', error)
    alert('파일 다운로드 중 오류가 발생했습니다.')
  }
}
</script> 