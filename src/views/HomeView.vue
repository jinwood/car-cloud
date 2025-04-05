<script setup lang="ts">
import BaseButton from '@/components/ui/BaseButton.vue'
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">Welcome to Car Cloud</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <BaseCard class="bg-blue-50">
        <h2 class="text-xl font-semibold mb-4">My Vehicles</h2>
        <p class="mb-4">Manage your vehicles and track their service history.</p>
        <BaseButton @click="$router.push('/vehicles')">View Vehicles</BaseButton>
      </BaseCard>

      <BaseCard class="bg-green-50">
        <h2 class="text-xl font-semibold mb-4">Add Service Record</h2>
        <p class="mb-4">Add a new service record to one of your vehicles.</p>
        <BaseButton @click="$router.push('/services/add')">Add Service</BaseButton>
      </BaseCard>
    </div>

    <div class="mt-8">
      <h2 class="text-xl font-semibold mb-4">Recent Services</h2>
      <div>Conditional Bit</div>
      <p class="text-gray-500">If recent service, something here.</p>
      <p class="text-gray-500">Else: No recent services found.</p>
    </div>
  </div>
</template>
