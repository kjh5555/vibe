<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const startChat = () => {
  // 로그인 상태 체크 (localStorage에서 토큰 확인)
  const token = localStorage.getItem('token')
  
  if (!token) {
    // 로그인되지 않은 경우 로그인 페이지로 이동
    router.push('/login')
  } else {
    // 로그인된 경우 채팅방 목록으로 이동
    router.push('/rooms')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 히어로 섹션 -->
    <div class="relative">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 class="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span class="block">실시간 화상 채팅으로</span>
          <span class="block text-blue-600">더 가까워지는 소통</span>
        </h1>
        <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          VIBE와 함께라면 언제 어디서나 실시간으로 소통할 수 있습니다. 
          화상 채팅, 파일 공유 등 다양한 기능을 이용해보세요.
        </p>
        <div class="mt-10 flex justify-center">
          <button
            @click="startChat"
            class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg"
          >
            지금 시작하기
          </button>
          <router-link
            to="/register"
            class="ml-4 inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg"
          >
            회원가입
          </router-link>
        </div>
      </div>

      <!-- 기능 소개 섹션 -->
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <!-- 화상 채팅 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">화상 채팅</h3>
            <p class="mt-2 text-base text-gray-500">
              고품질 화상 채팅으로 실시간 소통을 경험하세요.
            </p>
          </div>

          <!-- 파일 공유 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">파일 공유</h3>
            <p class="mt-2 text-base text-gray-500">
              간편한 파일 공유로 효율적인 협업이 가능합니다.
            </p>
          </div>

          <!-- 채팅방 -->
          <div class="text-center">
            <div class="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V4a2 2 0 012-2h10a2 2 0 012 2v4z" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-medium text-gray-900">채팅방</h3>
            <p class="mt-2 text-base text-gray-500">
              다양한 주제의 채팅방에서 새로운 대화를 시작하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 