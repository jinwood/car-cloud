<script setup lang="ts">
import BaseCard from '@/components/ui/BaseCard.vue'
import { onUnmounted, watch } from 'vue'
import AddVehicleForm from '@/components/forms/AddVehicleForm.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import type { Unsubscribe } from 'firebase/firestore' // For typing the listener
import { useVehicles } from '@/stores/useVehicleStore'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useAuthStore())
const { vehicles, error, loading, getVehicles } = useVehicles() // Destructure loading

let unsubscribeListener: Unsubscribe | null = null

const refreshUserVehicles = async () => {
  if (user) {
    if (unsubscribeListener) {
      unsubscribeListener()
      unsubscribeListener = null // Reset before reassigning
    }
    const unsub = await getVehicles(String(user.value?.uid))
    if (unsub) {
      unsubscribeListener = unsub
    } else {
      unsubscribeListener = null
    }
  } else {
    vehicles.value = [] // Clear vehicles
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
    <h2>My Vehicles</h2>
    <div v-if="loading">Loading vehicles...</div>
    <div v-else-if="error" class="error">{{ error?.message }}</div>
    <ul v-else-if="vehicles.length > 0">
      <li v-for="vehicle in vehicles" :key="vehicle.id">
        {{ vehicle.make }} {{ vehicle.model }} ({{ vehicle.registrationNumber }})
      </li>
    </ul>
    <p v-else>No vehicles found. Add one!</p>
    <AddVehicleForm @vehicle-added="refreshUserVehicles" />
  </BaseCard>
</template>

<style scoped>
.error {
  color: red;
}
</style>
