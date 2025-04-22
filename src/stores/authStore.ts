import { onAuthStateChanged, signInWithEmailAndPassword, signOut, type User } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'

interface UserData {
  uid: string
  email: string | null
  displayName: string | null
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<UserData | null>(null)
  const loading = ref<boolean>(true)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const userEmail = computed(() => user.value?.email)

  function init() {
    const auth = useFirebaseAuth()
    if (!auth) {
      throw Error('bad')
    }
    onAuthStateChanged(auth, (firebaseUser: User | null) => {
      user.value = firebaseUser
        ? {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
          }
        : null
      loading.value = false
    })
  }
  async function login(email: string, password: string) {
    loading.value = true
    error.value = null

    try {
      const auth = useFirebaseAuth()
      if (!auth) throw Error('bad')
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      const err = e as Error
      error.value = err.message
    } finally {
      loading.value = false
    }
  }
  async function logout() {
    const auth = useFirebaseAuth()
    if (!auth) throw Error('bad')
    await signOut(auth)
  }
  return {
    user,
    loading,
    error,
    isAuthenticated,
    userEmail,
    init,
    login,
    logout,
  }
})
