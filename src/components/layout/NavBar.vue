<template>
  <nav>
    <div class="block sm:hidden">
      <button @click="isOpen = !isOpen" class="flex items-center px-3 py-2 text-white">
        <svg class="h-6 w-6 fill-current" viewBox="0 0 24 24">
          <path
            v-if="isOpen"
            d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
          />
          <path
            v-else
            d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
          />
        </svg>
      </button>
    </div>

    <div
      :class="isOpen ? 'block' : 'hidden'"
      class="sm:block absolute sm:relative bg-blue-600 sm:bg-transparent top-16 sm:top-0 left-0 right-0 sm:flex-row z-20 shadow-md sm:shadow-none"
    >
      <div class="px-4 py-2 sm:p-0 sm:ml-6 flex flex-col sm:flex-row">
        <router-link to="/" class="block px-2 py-1 sm:mx-2 hover:text-blue-200" @click="closeMenu"
          >Home</router-link
        >
        <router-link
          to="/vehicles"
          class="block px-2 py-1 sm:mx-2 hover:text-blue-200"
          @click="closeMenu"
          >My Vehicles</router-link
        >
        <router-link
          to="/profile"
          class="block px-2 py-1 sm:mx-2 hover:text-blue-200"
          @click="closeMenu"
          >Profile</router-link
        >
        <button @click="logout" class="block px-2 py-1 sm:mx-2 text-left hover:text-blue-200">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'NavBar',
  setup() {
    const isOpen = ref(false)
    const router = useRouter()

    const closeMenu = () => {
      isOpen.value = false
    }

    const logout = async () => {
      try {
        //logout here
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    return {
      isOpen,
      closeMenu,
      logout,
    }
  },
}
</script>
