<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
import BaseCard from '@/components/ui/BaseCard.vue'
import TextInput from '@/components/ui/TextInput.vue'
</script>
<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <BaseCard><h2 class="text-2xl font-semibold">Register</h2></BaseCard>
    <BaseCard>
      <TextInput :id="''" />
    </BaseCard>
  </div>
</template>
