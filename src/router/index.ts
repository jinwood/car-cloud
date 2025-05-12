import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/account/LoginView.vue'
import RegisterView from '../views/account/RegisterView.vue'
import { getCurrentUser, useCurrentUser } from 'vuefire'
import { useAuthStore } from '@/stores/useAuthStore'
import VehicleList from '@/views/VehicleList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/vehicles',
      name: 'My Vehicles',
      component: VehicleList,
    },
  ],
})

let authInitialised = false

router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  console.log(authStore.isAuthenticated)
  if (!authInitialised) {
    await getCurrentUser()
    authInitialised = true
  }
  const isAuthenticated = authStore.isAuthenticated

  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)

  if (requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
