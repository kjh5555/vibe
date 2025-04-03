<template>
  <div class="h-[80vh] bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">VIBE</h1>
        <h2 class="text-xl font-semibold text-gray-600">로그인하고 대화를 시작하세요</h2>
      </div>

      <!-- Login Form -->
      <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <form class="space-y-6" @submit.prevent="handleLogin">
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
          </div>

          <!-- Remember Me & Forgot Password -->
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                v-model="rememberMe"
                type="checkbox"
                class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-700 cursor-pointer">
                로그인 상태 유지
              </label>
            </div>
            <a href="#" class="text-sm font-medium text-blue-600 hover:text-blue-500">
              비밀번호 찾기
            </a>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="bg-red-50 text-red-500 p-3 rounded-lg text-sm">
            {{ error }}
          </div>

          <!-- Login Button -->
          <button
            type="submit"
            :disabled="isLoading"
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
            {{ isLoading ? '로그인 중...' : '로그인' }}
          </button>
        </form>

        <!-- Divider -->
        <div class="relative mt-8">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-gray-200"></div>
          </div>
          <div class="relative flex justify-center text-sm">
            <span class="px-2 bg-white text-gray-500">또는</span>
          </div>
        </div>

        <!-- Social Login -->
        <div class="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            @click="handleGoogleLogin"
            class="w-full inline-flex justify-center py-3 px-4 rounded-lg shadow-sm bg-white border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.0003 4.67676C13.3389 4.67676 14.5271 5.15926 15.4573 5.96626L18.5681 2.85676C16.7223 1.14176 14.5417 0.131758 12.0003 0.131758C8.19431 0.131758 4.88331 2.27176 3.03931 5.45176L6.48931 8.11176C7.39731 6.10176 9.51231 4.67676 12.0003 4.67676Z"
              />
              <path
                fill="#4285F4"
                d="M23.4902 12.2727C23.4902 11.4887 23.4202 10.7337 23.2802 10.0078H12.0002V14.4518H18.4702C18.1352 15.9648 17.2892 17.2318 16.0402 18.1048L19.4432 20.7258C21.6412 18.7118 23.4902 15.7708 23.4902 12.2727Z"
              />
              <path
                fill="#FBBC05"
                d="M6.48919 13.8868C6.20919 13.2288 6.04919 12.5148 6.04919 11.7728C6.04919 11.0308 6.20919 10.3168 6.47919 9.65881L3.02919 6.99881C2.19919 8.44481 1.73419 10.0598 1.73419 11.7728C1.73419 13.4858 2.19919 15.1008 3.02919 16.5468L6.48919 13.8868Z"
              />
              <path
                fill="#34A853"
                d="M12.0003 23.4136C14.5417 23.4136 16.7223 22.4736 18.4583 20.7286L15.0553 18.1076C14.1273 18.7356 13.0153 19.1006 12.0003 19.1006C9.51231 19.1006 7.39731 17.6756 6.48931 15.6656L3.03931 18.3256C4.88331 21.5056 8.19431 23.4136 12.0003 23.4136Z"
              />
            </svg>
            Google로 로그인
          </button>

          <button
            type="button"
            @click="handleKakaoLogin"
            class="w-full inline-flex justify-center py-3 px-4 rounded-lg shadow-sm bg-[#FEE500] text-sm font-medium text-[#191919] hover:bg-[#FEE500]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEE500] transition-colors"
          >
            <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.5c-5.523 0-10 3.545-10 7.917 0 2.724 1.825 5.116 4.584 6.444-.2.775-.764 2.81-.877 3.248-.137.533.197.525.413.382.17-.114 2.699-1.833 3.788-2.577.677.1 1.375.153 2.092.153 5.523 0 10-3.545 10-7.917S17.523 2.5 12 2.5z" fill="currentColor"/>
            </svg>
            카카오로 로그인
          </button>
        </div>

        <!-- Sign Up Link -->
        <p class="mt-8 text-center text-sm text-gray-600">
          아직 계정이 없으신가요?
          <router-link to="/register" class="font-medium text-blue-600 hover:text-blue-500">회원가입</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const isLoading = ref(false)
const error = ref('')

const handleLogin = async () => {
  try {
    // 로컬스토리지에서 사용자 데이터 확인
    const localUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = localUsers.find(u => u.email === email.value);
    
    if (user) {
      // 로컬스토리지에 있는 사용자의 경우 서버에 등록
      await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          name: user.name
        }),
      });
    }

    // 로그인 요청
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('로그인에 실패했습니다.');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // 로그인 성공 시 채팅방 목록으로 이동
    router.push('/rooms');
  } catch (error) {
    alert(error.message);
  }
};

const handleGoogleLogin = () => {
  // TODO: Google 로그인 구현
  console.log('Google 로그인')
}

const handleKakaoLogin = () => {
  // TODO: Kakao 로그인 구현
  console.log('Kakao 로그인')
}
</script> 