<template>
  <header class="bg-blue-100 text-gray-700 shadow-md dark:bg-gray-800 dark:text-gray-200">
    <div class="container mx-auto px-4 py-3 flex justify-between items-center">
      <router-link to="/" class="text-xl font-bold">CarCloud</router-link>
      <NavBar />
    </div>
  </header>
</template>

<script lang="ts">
import NavBar from './NavBar.vue'
export default {
  name: 'AppHeader',
  components: {
    NavBar,
  },
}
</script>
