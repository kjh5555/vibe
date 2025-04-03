<!-- RoomList.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <!-- 검색 및 필터 영역 -->
      <div class="sticky top-0 z-10 bg-gray-50 pb-4 mb-6">
        <div class="flex flex-wrap gap-4 items-center justify-between">
          <div class="flex-1 min-w-[200px] max-w-md">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="채팅방 검색..."
              class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
          </div>
          
          <div class="flex gap-4">
            <select
              v-model="sortBy"
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="latest">최신순</option>
              <option value="participants">참여자순</option>
            </select>
            
            <select
              v-model="filterBy"
              class="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체</option>
              <option value="public">공개방</option>
              <option value="private">비공개방</option>
            </select>

            <button
              @click="showCreateModal = true"
              class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              방 만들기
            </button>
          </div>
        </div>
      </div>

      <!-- 채팅방 목록 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="room in filteredRooms"
          :key="room.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col h-[200px]"
        >
          <div class="p-6 flex flex-col h-full">
            <div class="flex-1">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-lg font-semibold flex items-center gap-2 truncate pr-2">
                  {{ room.name }}
                  <span
                    v-if="room.isPrivate"
                    class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full flex-shrink-0"
                  >
                    비공개
                  </span>
                </h3>
              </div>
              <p class="text-gray-600 text-sm line-clamp-2 mb-4">{{ room.description || '설명 없음' }}</p>
            </div>

            <div class="mt-auto">
              <div class="flex items-center justify-between text-sm text-gray-500 mb-3">
                <div class="flex items-center gap-4">
                  <span class="flex items-center gap-1">
                    <i class="fas fa-users"></i>
                    {{ room.participants }}명
                  </span>
                  <span class="flex items-center gap-1">
                    <i class="fas fa-clock"></i>
                    {{ formatTime(room.createdAt) }}
                  </span>
                </div>
              </div>

              <button
                @click="joinRoom(room)"
                class="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                참여하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 빈 목록 상태 -->
      <div
        v-if="filteredRooms.length === 0"
        class="text-center py-12 text-gray-500 bg-white rounded-lg shadow-md"
      >
        <p v-if="searchQuery">검색 결과가 없습니다.</p>
        <p v-else>아직 생성된 채팅방이 없습니다.</p>
      </div>

      <!-- 채팅방 생성 모달 -->
      <Teleport to="body">
        <div
          v-if="showCreateModal"
          class="fixed inset-0 z-50"
        >
          <!-- 모달 배경 -->
          <div 
            class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            @click="closeModal"
          ></div>
          
          <!-- 모달 컨텐츠 -->
          <div class="absolute inset-0 flex items-center justify-center p-4">
            <div 
              class="bg-white rounded-lg p-6 w-full max-w-md relative"
              @click.stop
            >
              <button
                @click="closeModal"
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <h2 class="text-2xl font-bold mb-6">새 채팅방 만들기</h2>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    방 이름
                  </label>
                  <input
                    v-model="newRoom.name"
                    type="text"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="채팅방 이름을 입력하세요"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    설명
                  </label>
                  <textarea
                    v-model="newRoom.description"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="채팅방 설명을 입력하세요"
                    rows="3"
                  ></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    카테고리
                  </label>
                  <select
                    v-model="newRoom.category"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="general">일반</option>
                    <option value="gaming">게임</option>
                    <option value="music">음악</option>
                    <option value="study">스터디</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                <div class="flex items-center gap-2">
                  <input
                    v-model="newRoom.isPrivate"
                    type="checkbox"
                    id="isPrivate"
                    class="rounded text-blue-500 focus:ring-blue-500"
                  >
                  <label for="isPrivate" class="text-sm text-gray-700">
                    비공개 방으로 만들기
                  </label>
                </div>

                <div v-if="newRoom.isPrivate">
                  <label class="block text-sm font-medium text-gray-700 mb-1">
                    비밀번호
                  </label>
                  <input
                    v-model="newRoom.password"
                    type="password"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="비밀번호를 입력하세요"
                  >
                </div>
              </div>

              <div class="flex justify-end gap-4 mt-6">
                <button
                  @click="closeModal"
                  class="px-4 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                >
                  취소
                </button>
                <button
                  @click="createRoom"
                  class="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  만들기
                </button>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { io } from 'socket.io-client'

const router = useRouter()
const socket = io('http://localhost:3000')
const rooms = ref([])
const showCreateModal = ref(false)
const searchQuery = ref('')
const sortBy = ref('latest') // 'latest' | 'participants'
const filterBy = ref('all') // 'all' | 'public' | 'private'

// 새 채팅방 생성 폼 데이터
const newRoom = ref({
  name: '',
  description: '',
  isPrivate: false,
  password: '',
  category: 'general' // 'general' | 'gaming' | 'music' | 'study' | 'other'
})

// 정렬된/필터링된 채팅방 목록
const filteredRooms = computed(() => {
  let filtered = [...rooms.value]

  // 검색어로 필터링
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(room => 
      room.name.toLowerCase().includes(query) || 
      room.description.toLowerCase().includes(query)
    )
  }

  // 카테고리로 필터링
  if (filterBy.value !== 'all') {
    filtered = filtered.filter(room => 
      filterBy.value === 'public' ? !room.isPrivate : room.isPrivate
    )
  }

  // 정렬
  filtered.sort((a, b) => {
    if (sortBy.value === 'latest') {
      return new Date(b.createdAt) - new Date(a.createdAt)
    } else {
      return b.participants - a.participants
    }
  })

  return filtered
})

// 시간 포맷 함수
const formatTime = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date

  // 24시간 이내인 경우 "n시간 전" 형식으로 표시
  if (diff < 24 * 60 * 60 * 1000) {
    const hours = Math.floor(diff / (60 * 60 * 1000))
    if (hours === 0) {
      const minutes = Math.floor(diff / (60 * 1000))
      return `${minutes}분 전`
    }
    return `${hours}시간 전`
  }

  // 그 외의 경우 "YYYY-MM-DD" 형식으로 표시
  return date.toLocaleDateString()
}

// 채팅방 생성 처리
const createRoom = () => {
  if (!newRoom.value.name.trim()) {
    alert('채팅방 이름을 입력해주세요.')
    return
  }

  socket.emit('create-room', newRoom.value, (roomId) => {
    showCreateModal.value = false
    router.push(`/chat/${roomId}`)
  })
}

// 채팅방 참여 처리
const joinRoom = (room) => {
  if (room.isPrivate) {
    const password = prompt('비밀번호를 입력해주세요:')
    if (!password) return

    socket.emit('join-room', { roomId: room.id, password }, (success) => {
      if (success) {
        router.push(`/chat/${room.id}`)
      } else {
        alert('비밀번호가 올바르지 않습니다.')
      }
    })
  } else {
    socket.emit('join-room', { roomId: room.id }, (success) => {
      if (success) {
        router.push(`/chat/${room.id}`)
      }
    })
  }
}

// 모달 관련 함수
const closeModal = () => {
  showCreateModal.value = false
  resetForm()
}

const resetForm = () => {
  newRoom.value = {
    name: '',
    description: '',
    isPrivate: false,
    password: '',
    category: 'general'
  }
}

// 모달 열릴 때 body 스크롤 방지
watch(showCreateModal, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// 채팅방 목록 업데이트 이벤트 리스너
onMounted(() => {
  socket.emit('get-rooms')

  socket.on('rooms-list', (roomsList) => {
    rooms.value = roomsList
  })

  socket.on('room-created', (room) => {
    rooms.value.push(room)
  })

  socket.on('room-updated', (updatedRoom) => {
    const index = rooms.value.findIndex(r => r.id === updatedRoom.id)
    if (index !== -1) {
      rooms.value[index] = { ...rooms.value[index], ...updatedRoom }
    }
  })
})
</script>

<style scoped>
/* 설명 텍스트 2줄 제한 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 스크롤바 스타일링 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #666;
}

/* 모달 애니메이션 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style> 