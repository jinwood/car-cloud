<template>
  <form @submit.prevent="handleSubmit">
    <h3>Add New Vehicle</h3>
    <div>
      <label for="make">Make:</label>
      <input type="text" v.model="formData.make" id="make" required />
    </div>
    <div>
      <label for="model">Model:</label>
      <input type="text" v.model="formData.model" id="model" required />
    </div>
    <div>
      <label for="reg">Registration:</label>
      <input type="text" v.model="formData.registrationNumber" id="reg" />
    </div>
    <div>
      <label for="fuelType">Fuel Type:</label>
      <select v.model="formData.fuelType" id="fuelType" required>
        <option v-for="type in fuelTypes" :key="type" :value="type">{{ type }}</option>
      </select>
    </div>
    <div>
      <label for="reg">Engine Size:</label>
      <input type="text" v.model="formData.engineSize" id="engineSize" />
    </div>
    <div>
      <label for="fuelType">Body Type:</label>
      <select v.model="formData.bodyType" id="bodyTypes" required>
        <option v-for="bodyType in bodyTypes" :key="bodyType" :value="bodyType">
          {{ bodyType }}
        </option>
      </select>
    </div>

    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Adding...' : 'Add Vehicle' }}
    </button>
    <p v-if="submitError" class="error">{{ submitError }}</p>
  </form>
</template>

<script setup lang="ts">
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
