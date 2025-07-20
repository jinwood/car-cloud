<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { useCurrentUser, useFirebaseAuth } from 'vuefire'

const auth = useFirebaseAuth()
console.log(auth)
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
