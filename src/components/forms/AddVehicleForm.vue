<template>
  <form
    @submit.prevent="handleSubmit"
    class="dark:bg-gray-800 dark:text-gray-100 bg-white text-gray-800 rounded-lg shadow-md p-6 grid grid-cols-1 gap-6"
  >
    <BaseCard :split-columns="true">
      <div>
        <label for="make" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Make:</label
        >
        <TextInput type="text" v-model="formData.make" id="make" required />
      </div>
      <div>
        <label for="model" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Model:</label
        >
        <TextInput type="text" v-model="formData.model" id="model" required />
      </div>
      <div>
        <label for="reg" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Registration:</label
        >
        <TextInput type="text" v-model="formData.registrationNumber" id="reg" />
      </div>
      <div>
        <label for="fuelType" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Fuel Type:</label
        >
        <select
          v-model="formData.fuelType"
          id="fuelType"
          required
          class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="type in fuelTypes" :key="type" :value="type">{{ type }}</option>
        </select>
      </div>
      <div>
        <label for="engineSize" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Engine Size:</label
        >
        <TextInput type="text" v-model="formData.engineSize" id="engineSize" />
      </div>
      <div>
        <label for="bodyTypes" class="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >Body Type:</label
        >
        <select
          v-model="formData.bodyType"
          id="bodyTypes"
          required
          class="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option v-for="bodyType in bodyTypes" :key="bodyType" :value="bodyType">
            {{ bodyType }}
          </option>
        </select>
      </div>

      <BaseButton type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? 'Adding...' : 'Add Vehicle' }}
      </BaseButton>
      <p v-if="submitError" class="text-red-500">{{ submitError }}</p>
    </BaseCard>
  </form>
</template>

<script setup lang="ts">
import TextInput from '../ui/TextInput.vue'
import BaseCard from '../ui/BaseCard.vue'
import BaseButton from '../ui/BaseButton.vue'
import { ref, reactive } from 'vue'
import { useVehicles } from '@/stores/useVehicleStore'
import { BodyType, FuelType } from '@/types'

const emit = defineEmits(['vehicle-added'])

const { addVehicle, loading: isSubmitting, error: submitErrorHook } = useVehicles()

const formData = reactive({
  make: '',
  model: '',
  registrationNumber: '',
  fuelType: FuelType.PETROL,
  bodyType: BodyType.HATCHBACK,
  engineSize: 2000,
})

const submitError = ref<string | null>(null)

const fuelTypes = Object.values(FuelType)
const bodyTypes = Object.values(BodyType)

const handleSubmit = async () => {
  submitError.value = null
  try {
    if (!formData.make || !formData.model || !formData.fuelType) {
      submitError.value = 'Make, Model, and Fuel Type are required.'
      return
    }

    await addVehicle({
      make: formData.make,
      model: formData.model,
      registrationNumber: formData.registrationNumber,
      fuelType: formData.fuelType,
      bodyType: formData.bodyType,
      engineSize: String(formData.engineSize),
      // year, vin, colour etc. would be added here
    })
    emit('vehicle-added')
    // Reset form
    formData.make = ''
    formData.model = ''
    formData.registrationNumber = ''
    formData.fuelType = FuelType.PETROL
  } catch (e: any) {
    submitError.value = e.message || 'Failed to add vehicle.'
    console.error(e)
  }
}
</script>

<style scoped>
.error {
  color: red;
}
form div {
  margin-bottom: 10px;
}
label {
  display: block;
  margin-bottom: 5px;
}
input,
select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
</style>
