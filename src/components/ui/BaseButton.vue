<template>
  <button
    class="px-4 py-2 bg-blue-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors hover:bg-blue-500"
    :class="[
      disabled
        ? 'bg-gray-200 text-gray-500 cursor-not-allowed hover:bg-gray-200'
        : 'cursor-pointer text-white ',
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'BaseButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
