<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import TextInput from '@/components/ui/TextInput.vue'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ref } from 'vue'
import { useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth()
const email = ref('foo@bar.com')
const password = ref('password123')
const error = ref('')
const loading = ref(false)

const handleRegister = async () => {
  console.log('handleRegister')
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

    const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value)

    console.log('success', userCredential.user)
    email.value = ''
    password.value = ''
  } catch (e) {
    // Handle specific Firebase auth errors
    if (e instanceof Error) {
      error.value = e.message
    } else {
      error.value = 'An unknown error occurred'
    }
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <BaseCard><h2 class="text-2xl font-semibold">Register</h2></BaseCard>
    <BaseCard>
      <form @submit.prevent="handleRegister">
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
