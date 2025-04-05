<template>
  <div class="min-h-screen bg-gray-100 flex flex-col w-full">
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

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
}
</script>
