<template>
  <div class="min-h-screen bg-gray-100 flex flex-col dark:bg-gray-900">
    <AppHeader />
    <main class="flex-grow container mx-auto px-4 py-6">
      <router-view />
    </main>
    <AppFooter />
  </div>
</template>

<script lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import { useAuthStore } from './stores/useAuthStore'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  created() {
    const authStore = useAuthStore()
    authStore.init()
  },
}
</script>
