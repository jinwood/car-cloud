<template>
  <button
    class="px-4 py-2 bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors hover:bg-blue-500"
    :class="[disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer']"
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
