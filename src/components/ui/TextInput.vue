<script lang="ts" setup>
import { type InputTypeHTMLAttribute, PropType } from 'vue'
const props = defineProps({
  id: String,
  label: String,
  type: { type: String as PropType<InputTypeHTMLAttribute>, default: 'text' },
  value: String,
})
</script>
<template>
  <div>
    <label :for="id">{{ props.label }}</label>
    <input
      :type="props.type"
      :id="props.id"
      :value="props.value"
      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />
  </div>
</template>
