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

  return { claims, isLoading, error, fetchClaims }
})