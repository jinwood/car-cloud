// src/composables/useVehicles.ts
import { ref } from 'vue'
import { db, auth } from '@/firebase'
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore'
import type { Vehicle } from '@/types'
import { serverTimestamp } from 'firebase/database'

export function useVehicles() {
  const vehicles = ref<Vehicle[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const getVehicles = async (userId: string) => {
    if (!userId) {
      vehicles.value = []
      return
    }
    loading.value = true
    error.value = null
    const vehiclesCol = collection(db, 'vehicles')
    const q = query(vehiclesCol, where('userId', '==', userId))

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        vehicles.value = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Vehicle)
        loading.value = false
      },
      (err) => {
        console.error('Error fetching vehicles:', err)
        error.value = err
        loading.value = false
      },
    )
    // Unmount tidy up
    return unsubscribe
  }

  const addVehicle = async (
    vehicleData: Omit<Vehicle, 'id' | 'userId' | 'createdAt' | 'updatedAt'>,
  ) => {
    if (!auth.currentUser) throw new Error('User not authenticated')
    loading.value = true
    try {
      const newVehicle: Omit<Vehicle, 'id'> = {
        ...vehicleData,
        userId: auth.currentUser.uid,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        createdAt: serverTimestamp() as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updatedAt: serverTimestamp() as any,
      }
      const docRef = await addDoc(collection(db, 'vehicles'), newVehicle)
      loading.value = false
      return docRef.id
    } catch (e) {
      console.error('Error adding vehicle: ', e)
      error.value = e as Error
      loading.value = false
      throw e
    }
  }

  const updateVehicle = async (vehicleId: string, updates: Partial<Vehicle>) => {
    loading.value = true
    try {
      const vehicleRef = doc(db, 'vehicles', vehicleId)
      await updateDoc(vehicleRef, { ...updates, updatedAt: serverTimestamp() })
      loading.value = false
    } catch (e) {
      console.error('Error updating vehicle: ', e)
      error.value = e as Error
      loading.value = false
      throw e
    }
  }

  const deleteVehicle = async (vehicleId: string) => {
    // Todo: delete related service history if stored as subcollection,
    // or handle orphaned data
    loading.value = true
    try {
      const vehicleRef = doc(db, 'vehicles', vehicleId)
      await deleteDoc(vehicleRef)
      // Todo: delete service history for this vehicle (example if using subcollections)
      // const serviceHistoryQuery = query(collection(db, `vehicles/${vehicleId}/serviceEntries`));
      // const serviceHistorySnap = await getDocs(serviceHistoryQuery);
      // const deletePromises = serviceHistorySnap.docs.map(d => deleteDoc(d.ref));
      // await Promise.all(deletePromises);
      loading.value = false
    } catch (e) {
      console.error('Error deleting vehicle: ', e)
      error.value = e as Error
      loading.value = false
      throw e
    }
  }

  return {
    vehicles,
    loading,
    error,
    getVehicles,
    addVehicle,
    updateVehicle,
    deleteVehicle,
  }
}
