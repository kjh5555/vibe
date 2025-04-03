<template>
  <div class="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">VIBE</h1>
        <h2 class="text-xl font-semibold text-gray-600">새로운 계정 만들기</h2>
      </div>

      <!-- Register Form -->
      <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form class="space-y-6" @submit.prevent="handleRegister">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">이름</label>
            <div class="relative">
              <input
                id="name"
                v-model="name"
                type="text"
                required
                class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="홍길동"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">이메일</label>
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                required
                class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="name@example.com"
              />
              <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
              >
                <svg
                  v-if="showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </button>
            </div>
            <p class="mt-1 text-sm text-gray-500">최소 8자 이상, 영문, 숫자, 특수문자 포함</p>
          </div>

          <!-- Password Confirm Input -->
          <div>
            <label for="passwordConfirm" class="block text-sm font-medium text-gray-700 mb-1">비밀번호 확인</label>
            <div class="relative">
              <input
                id="passwordConfirm"
                v-model="passwordConfirm"
                :type="showPasswordConfirm ? 'text' : 'password'"
                required
                class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                @click="showPasswordConfirm = !showPasswordConfirm"
                class="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
              >
                <svg
                  v-if="showPasswordConfirm"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
                </svg>
                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-gray-400 hover:text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
                  <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Terms Agreement -->
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                id="terms"
                v-model="agreedToTerms"
                type="checkbox"
                required
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-medium text-gray-700 cursor-pointer">
                <span>이용약관</span>
                <a href="#" class="text-blue-600 hover:text-blue-500">개인정보 처리방침</a>
                <span>에 동의합니다</span>
              </label>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Register Button -->
          <button
            type="submit"
            :disabled="isLoading || !isFormValid"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              v-if="isLoading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            {{ isLoading ? '가입 중...' : '회원가입' }}
          </button>
        </form>

        <!-- Login Link -->
        <p class="mt-8 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?
          <router-link to="/login" class="font-medium text-blue-600 hover:text-blue-500">로그인하기</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const showPassword = ref(false)
const showPasswordConfirm = ref(false)
const agreedToTerms = ref(false)
const isLoading = ref(false)
const error = ref('')

// 비밀번호 유효성 검사
const isPasswordValid = computed(() => {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return regex.test(password.value)
})

// 비밀번호 확인 일치 검사
const isPasswordMatch = computed(() => {
  return password.value === passwordConfirm.value
})

// 폼 전체 유효성 검사
const isFormValid = computed(() => {
  return (
    name.value.length >= 2 &&
    email.value &&
    isPasswordValid.value &&
    isPasswordMatch.value &&
    agreedToTerms.value
  )
})

const handleRegister = async () => {
  try {
    if (!isFormValid.value) {
      error.value = '모든 필드를 올바르게 입력해주세요.'
      return
    }

    isLoading.value = true
    error.value = ''

    // 사용자 정보 객체 생성
    const userInfo = {
      name: name.value,
      email: email.value,
      password: password.value // 실제 서비스에서는 비밀번호를 해시화하여 저장해야 합니다
    }

    // 기존 사용자 목록 가져오기
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]')
    
    // 이메일 중복 체크
    if (existingUsers.some(user => user.email === email.value)) {
      error.value = '이미 등록된 이메일입니다.'
      isLoading.value = false
      return
    }

    // 새 사용자 추가
    existingUsers.push(userInfo)
    localStorage.setItem('users', JSON.stringify(existingUsers))

    // 회원가입 성공 후 로그인 페이지로 이동
    router.push('/login')
  } catch (err) {
    error.value = '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
  } finally {
    isLoading.value = false
  }
}
</script> 