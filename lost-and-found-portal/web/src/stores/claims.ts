import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

// Define TypeScript interfaces based on your db.json
export interface Claim {
  id: string
  title: string
  description: string
  status: string
  categoryId: string
  requesterId: string
}

export const useClaimStore = defineStore('claims', () => {
  const claims = ref<Claim[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchClaims = async () => {
    isLoading.value = true
    error.value = null
    try {
      // Connects to the json-server fake backend
      const response = await axios.get('http://localhost:3000/claims')
      claims.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Failed to fetch claims'
    } finally {
      isLoading.value = false
    }
  }

  const deleteClaim = async (id: string) => {
    isLoading.value = true
    error.value = null
    try {
      await axios.delete(`http://localhost:3000/claims/${id}`)
      claims.value = claims.value.filter(c => c.id !== id)
    } catch (err: any) {
      error.value = err.message || 'Error deleting claim'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const updateClaimStatus = async (id: string, status: string) => {
    error.value = null
    try {
      const response = await axios.patch(`http://localhost:3000/claims/${id}`, { status })
      const index = claims.value.findIndex(c => c.id === id)
      if (index !== -1) {
        claims.value[index] = response.data
      }
    } catch (err: any) {
      error.value = err.message || 'Error updating status'
      throw err
    }
  }

  const createClaim = async (newClaim: Omit<Claim, 'id'>) => {
    isLoading.value = true
    error.value = null
    try {
      const response = await axios.post('http://localhost:3000/claims', newClaim)
      claims.value.push(response.data)
    } catch (err: any) {
      error.value = err.message || 'Error creating claim'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  return { claims, isLoading, error, fetchClaims, deleteClaim, updateClaimStatus, createClaim }
})