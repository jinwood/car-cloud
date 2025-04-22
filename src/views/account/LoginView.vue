<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import TextInput from '@/components/ui/TextInput.vue'

import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword } from 'firebase/auth'

const auth = useFirebaseAuth()
const email = ref('foo@bar.com')
const password = ref('password123')
const error = ref('')
const loading = ref(false)

const handleLogin = async () => {
  console.log('handleLogin')
  if (!auth) {
    throw new Error('bad')
  }

  if (!email.value || !password.value) {
    error.value = 'Email and password are required'
    return
  }

  try {
    loading.value = true
    error.value = ''

    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    if (userCredential.user) {
      console.log('cool', userCredential.user.email)
    }
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'something bad happened'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <BaseCard
      ><h2 class="text-2xl font-semibold pb-4">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="flex flex-col gap-4">
          <TextInput id="email" label="Email" type="email" :value="email" />
          <TextInput id="password" label="Password" type="password" />
          <BaseButton type="submit" :disabled="loading">
            {{ loading ? 'Registering...' : 'Submit' }}
          </BaseButton>
        </div>
      </form>
    </BaseCard>
  </div>
</template>
