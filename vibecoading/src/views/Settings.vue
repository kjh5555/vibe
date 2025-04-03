<script setup>
import { ref } from 'vue'

const settings = ref({
  notifications: true,
  sound: true,
  video: {
    quality: 'high',
    frameRate: 30
  },
  audio: {
    echoCancellation: true,
    noiseSuppression: true
  }
})

const saveSettings = () => {
  // TODO: Implement settings save logic
  console.log('Saving settings:', settings.value)
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-900 mb-6">설정</h2>
    
    <div class="bg-white shadow rounded-lg p-6 space-y-6">
      <!-- 알림 설정 -->
      <div>
        <h3 class="text-lg font-medium text-gray-900 mb-4">알림</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">알림 받기</span>
            <button
              @click="settings.notifications = !settings.notifications"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                settings.notifications ? 'bg-indigo-600' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  settings.notifications ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-gray-700">소리</span>
            <button
              @click="settings.sound = !settings.sound"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                settings.sound ? 'bg-indigo-600' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  settings.sound ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- 비디오 설정 -->
      <div>
        <h3 class="text-lg font-medium text-gray-900 mb-4">비디오</h3>
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">화질</label>
            <select
              v-model="settings.video.quality"
              class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option value="low">낮음</option>
              <option value="medium">중간</option>
              <option value="high">높음</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">프레임레이트</label>
            <select
              v-model="settings.video.frameRate"
              class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              <option :value="15">15 fps</option>
              <option :value="30">30 fps</option>
              <option :value="60">60 fps</option>
            </select>
          </div>
        </div>
      </div>

      <!-- 오디오 설정 -->
      <div>
        <h3 class="text-lg font-medium text-gray-900 mb-4">오디오</h3>
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <span class="text-gray-700">에코 제거</span>
            <button
              @click="settings.audio.echoCancellation = !settings.audio.echoCancellation"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                settings.audio.echoCancellation ? 'bg-indigo-600' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  settings.audio.echoCancellation ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>
          
          <div class="flex items-center justify-between">
            <span class="text-gray-700">노이즈 제거</span>
            <button
              @click="settings.audio.noiseSuppression = !settings.audio.noiseSuppression"
              :class="[
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2',
                settings.audio.noiseSuppression ? 'bg-indigo-600' : 'bg-gray-200'
              ]"
            >
              <span
                :class="[
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
                  settings.audio.noiseSuppression ? 'translate-x-5' : 'translate-x-0'
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- 저장 버튼 -->
      <div class="pt-5">
        <button
          @click="saveSettings"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          설정 저장
        </button>
      </div>
    </div>
  </div>
</template> 