<script setup>
import VideoChat from './components/VideoChat.vue'
</script>

<template>
  <div class="app">
    <h1>WebRTC 화상 채팅</h1>
    <VideoChat />
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
