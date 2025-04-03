import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import RoomList from '../views/RoomList.vue'
import Chat from '../views/Chat.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomList,
      meta: { requiresAuth: true }
    },
    {
      path: '/chat/:roomId',
      name: 'chat',
      component: Chat,
      props: true,
      meta: { requiresAuth: true }
    }
  ]
})

// 인증 가드
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (requiresAuth && !token) {
    // 인증이 필요한 페이지에 접근 시 로그인 페이지로 리다이렉트
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else if (token && (to.path === '/login' || to.path === '/register')) {
    // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근 시 채팅방 목록으로 리다이렉트
    next('/rooms')
  } else {
    next()
  }
})

export default router 