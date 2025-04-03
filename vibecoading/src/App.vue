<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navigation from './components/Navigation.vue'

const router = useRouter()
const isMenuOpen = ref(false)

const navigation = [
  { name: '홈', path: '/' },
  { name: '화상 채팅', path: '/chat' },
  { name: '설정', path: '/settings' }
]
</script>

<template>
  <div class="h-[80vh] bg-gray-100">
    <Navigation />
    <router-view></router-view>
  </div>
</template>

<style>
.app {
  font-family: Arial, sans-serif;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}
</style>
