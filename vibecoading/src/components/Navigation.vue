<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold">VIBE</h1>
          </div>
        </div>
        
        <div class="flex items-center">
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <template v-for="item in navigation" :key="item.name">
              <a
                v-if="item.path"
                :href="item.path"
                @click.prevent="router.push(item.path)"
                class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ item.name }}
              </a>
              <a
                v-else
                href="#"
                @click.prevent="item.action"
                class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                {{ item.name }}
              </a>
            </template>
          </div>
          
          <!-- 로그인 상태일 때 사용자 이름 표시 -->
          <div v-if="isLoggedIn" class="ml-4 text-sm text-gray-500">
            {{ userName }}님
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isMenuOpen = ref(false)

// 로그인 상태와 사용자 정보를 ref로 관리
const token = ref(localStorage.getItem('token'))
const userInfo = ref(JSON.parse(localStorage.getItem('user') || '{}'))

// 로그인 상태 확인
const isLoggedIn = computed(() => {
  return token.value !== null
})

// 사용자 이름 가져오기
const userName = computed(() => {
  return userInfo.value.name || '사용자'
})

// 로그아웃 처리
const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  // ref 값도 업데이트
  token.value = null
  userInfo.value = {}
  router.push('/login')
}

const navigation = computed(() => {
  const baseMenu = [
    { name: '홈', path: '/' }
  ]

  const authMenu = isLoggedIn.value
    ? [
        { name: '채팅방', path: '/rooms' },
        { name: '설정', path: '/settings' },
        { name: '로그아웃', action: handleLogout }
      ]
    : [
        { name: '로그인', path: '/login' },
        { name: '회원가입', path: '/register' }
      ]

  return [...baseMenu, ...authMenu]
})
</script>

<style scoped>
.router-link-active {
  color: #4F46E5;
  font-weight: 600;
}
</style> 