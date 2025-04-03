<!-- FileList.vue -->
<template>
  <div class="space-y-2">
    <div v-for="file in files" :key="file.id" 
      class="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <!-- 파일 정보 -->
      <div class="flex items-center space-x-2 min-w-0">
        <!-- 파일 아이콘 -->
        <div class="shrink-0">
          <svg v-if="isImageFile(file.name)" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        
        <!-- 파일명과 크기 -->
        <div class="min-w-0">
          <div class="text-sm font-medium text-gray-900 truncate">{{ file.name }}</div>
          <div class="text-xs text-gray-500">{{ formatFileSize(file.size) }}</div>
        </div>
      </div>

      <!-- 다운로드/삭제 버튼 -->
      <div class="flex items-center space-x-1 shrink-0">
        <button 
          @click="downloadFile(file)"
          class="p-1 hover:bg-gray-200 rounded transition-colors text-gray-600"
          title="다운로드"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
        <button 
          v-if="showDelete"
          @click="$emit('delete', file.id)"
          class="p-1 hover:bg-gray-200 rounded transition-colors text-gray-600"
          title="삭제"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  files: {
    type: Array,
    required: true
  },
  showDelete: {
    type: Boolean,
    default: true
  }
})

defineEmits(['delete'])

// 파일 크기 포맷
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

// 이미지 파일 체크
const isImageFile = (filename) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  const ext = '.' + filename.split('.').pop().toLowerCase()
  return imageExtensions.includes(ext)
}

// 파일 다운로드
const downloadFile = (file) => {
  const link = document.createElement('a')
  link.href = file.url
  link.download = file.name
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script> 