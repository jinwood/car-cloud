import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/account/LoginView.vue'
import RegisterView from '../views/account/RegisterView.vue'
import { useCurrentUser } from 'vuefire'

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
  ],
})

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
  const currentUser = useCurrentUser()
  console.log(currentUser.value)

  if (requiresAuth && !currentUser.value) {
    next('/login')
  } else {
    next()
  }
})

export default router
