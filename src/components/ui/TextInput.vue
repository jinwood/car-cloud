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
  <div class="input-wrapper">
    <label class="label" :for="id">{{ props.label }}:</label>
    <input :type="props.type" :id="props.id" :value="props.value" class="text-input" />
  </div>
</template>
<style lang="css" scoped>
@import '../../assets/base.css';
.input-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: start;
}

.label {
  padding: 4px;
}

.text-input {
  padding: 6px;
  background-color: var(--input-color);
  /* border-color: var(--border-color); */
  border: 2px solid var(--border-color);
  border-radius: var(--rounded-sm);
  border-style: solid;
  --webkit-border-radius: var(--rounded-sm);
  color: var(--text-color);
  font-size: var(--text-sm);

  :focus {
    border-color: var(--outline-color);
  }

  @media (min-width: 500px) {
    width: 100%;
  }
}
</style>
