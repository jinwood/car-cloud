<template>
  <div>
    <h2>My Vehicles</h2>
    <div v.if="loading">Loading vehicles...</div>
    <div v.if="error" class="error">{{ error?.message }}</div>
    <ul v.if="vehicles.length">
      <li v-for="vehicle in vehicles" :key="vehicle.id">
        {{ vehicle.make }} {{ vehicle.model }} ({{ vehicle.registrationNumber }})
      </li>
    </ul>
    <p v.else-if="!loading">No vehicles found. Add one!</p>
    <AddVehicleForm @vehicle-added="refreshVehicles" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import AddVehicleForm from '@/components/forms/AddVehicleForm.vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { useVehicles } from '@/stores/useVehicleStore'

const { user } = useAuthStore()
const { vehicles, loading, error, getVehicles } = useVehicles()
console.log(vehicles)

let unsubscribeVehicles: (() => void) | null = null

const refreshVehicles = async () => {
  if (user) {
    if (unsubscribeVehicles) unsubscribeVehicles()
    unsubscribeVehicles = await getVehicles(user.uid)
  }
}

watch(
  user,
  (newUser) => {
    if (newUser) {
      refreshVehicles()
    } else {
      vehicles.value = [] // Clear vehicles if user logs out
      if (unsubscribeVehicles) unsubscribeVehicles()
    }
  },
  { immediate: true },
)

onUnmounted(() => {
  if (unsubscribeVehicles) {
    unsubscribeVehicles()
  }
})
</script>

<style scoped>
.error {
  color: red;
}
</style>
