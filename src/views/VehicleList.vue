<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import { onUnmounted, watch } from 'vue'
import AddVehicleForm from '@/components/forms/AddVehicleForm.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Unsubscribe } from 'firebase/firestore'
import { useVehicles } from '@/stores/useVehicleStore'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useAuthStore())
const { vehicles, error, loading, getVehicles } = useVehicles()

let unsubscribeListener: Unsubscribe | null = null

const refreshUserVehicles = async () => {
  if (user) {
    if (unsubscribeListener) {
      unsubscribeListener()
      unsubscribeListener = null
    }
    const unsub = await getVehicles(String(user.value?.uid))
    if (unsub) {
      unsubscribeListener = unsub
    } else {
      unsubscribeListener = null
    }
  } else {
    vehicles.value = []
    if (unsubscribeListener) {
      unsubscribeListener()
      unsubscribeListener = null
    }
  }
}

watch(
  () => user,
  (currentUserValue, previousUserValue) => {
    if (currentUserValue) {
      refreshUserVehicles()
    } else {
      vehicles.value = []
      if (unsubscribeListener) {
        unsubscribeListener()
        unsubscribeListener = null
      }
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  if (unsubscribeListener) {
    unsubscribeListener()
    unsubscribeListener = null
  }
})
</script>

<template>
  <BaseCard>
    <h2 class="text-2xl font-bold mb-6 text-white">My Vehicles</h2>
    <div v-if="loading" class="text-red-300">Loading vehicles...</div>
    <div v-else-if="error" class="error">{{ error?.message }}</div>
    <ul v-else-if="vehicles.length > 0">
      <li v-for="vehicle in vehicles" :key="vehicle.id">
        {{ vehicle.make }} {{ vehicle.model }} ({{ vehicle.registrationNumber }})
      </li>
    </ul>
    <div v-else>
      <h3 class="text-xl">No vehicles found. Add one!</h3>
      <AddVehicleForm @vehicle-added="refreshUserVehicles" />
    </div>
  </BaseCard>
</template>

<style scoped>
.error {
  color: red;
}
</style>
