<template>
  <div
    class="dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-800 rounded-lg p-6 grid grid-cols-1 gap-6"
    :class="{ 'md:grid-cols-2': splitColumns }"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps({
  splitColumns: {
    type: Boolean,
    default: false,
  },
})
</script>
