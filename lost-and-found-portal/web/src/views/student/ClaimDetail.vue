<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClaimStore } from '@/stores/claims'

const route = useRoute()
const router = useRouter()
const claimStore = useClaimStore()

const currentUserId = 'e20230530' 
const claimId = route.params.id as string

onMounted(() => {
  if (claimStore.claims.length === 0) {
    claimStore.fetchClaims()
  }
})

const claim = computed(() => claimStore.claims.find(c => c.id === claimId))
const isOwner = computed(() => claim.value?.requesterId === currentUserId)
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Top Navigation Bar -->
    <header class="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md shrink-0">
      <div class="flex items-center gap-3 cursor-pointer" @click="router.push('/claims')">
        <img src="@/assets/Logo.png" alt="ITC Logo" class="w-11 h-11 rounded-full bg-white object-contain shadow-sm" />
        <h1 class="text-xl font-bold tracking-wider">I.T.C.</h1>
      </div>
      <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-sm cursor-pointer hover:bg-blue-100 hover:scale-105 hover:shadow-md transition-all duration-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      </div>
    </header>

    <!-- Full Screen Main Content -->
    <main class="flex-grow p-8 w-full flex flex-col relative">
      
      <!-- Back Navigation -->
      <button 
        @click="router.push('/claims')" 
        class="cursor-pointer mb-8 flex items-center text-gray-500 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 -ml-3 rounded-md font-medium transition-all duration-200 w-fit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Claims
      </button>

      <!-- Loading / Error States -->
      <div v-if="claimStore.isLoading" class="flex justify-center p-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
      
      <div v-else-if="!claim" class="bg-red-50 text-red-600 p-8 rounded-lg text-center shadow-sm border border-red-100">
        <h2 class="text-2xl font-bold mb-2">Claim Not Found</h2>
        <p>The requested item could not be found or has been removed.</p>
      </div>

      <!-- Detail Content -->
      <div v-else class="w-full flex flex-col">
        
        <!-- Top Section: Image & Details -->
        <div class="flex flex-col md:flex-row gap-8 relative">
          
          <!-- Edit Button -->
          <button 
            v-if="isOwner"
            class="cursor-pointer absolute top-0 right-0 px-6 py-2 border-2 border-gray-300 rounded-md text-sm font-bold text-gray-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            Edit
          </button>

          <!-- Image Placeholder -->
          <div class="w-full md:w-[400px] aspect-square bg-gray-50 border-2 border-gray-400 border-solid flex items-center justify-center relative overflow-hidden shrink-0">
            <svg class="absolute inset-0 w-full h-full text-gray-400" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" stroke-width="1.5" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </div>

          <!-- Right Side Details -->
          <div class="flex flex-col pt-2 pr-24">
            <h2 class="text-4xl font-normal text-gray-900 mb-4">{{ claim.title }}</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-6 max-w-2xl font-serif italic">
              {{ claim.description }}
            </p>
            <div class="mb-8">
              <span class="text-lg text-gray-800">Status: </span>
              <span class="text-lg font-serif italic text-gray-700">{{ claim.status }}</span>
            </div>
            
            <div>
              <button class="cursor-pointer px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                Contact Poster
              </button>
            </div>
          </div>
        </div>

        <!-- Full Width Divider -->
        <hr class="border-t-2 border-gray-400 my-10 w-full" />

        <!-- Bottom Section: Contact Info & Delete -->
        <div class="flex justify-between items-end w-full pb-8">
          
          <!-- Contact Info -->
          <div class="flex flex-col gap-2">
            <div class="text-2xl text-gray-900 mb-1">
              <span class="font-normal">Telephone:</span><br/>
              <span class="text-xl">0123456789</span>
            </div>
            <div class="text-2xl text-gray-900 mb-6">
              <span class="font-normal">Email:</span><br/>
              <span class="text-xl">hello@gmail.com</span>
            </div>
            
            <div>
              <button class="cursor-pointer px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                Contact SA Staff
              </button>
            </div>
          </div>

          <!-- Delete Button -->
          <button 
            v-if="isOwner"
            class="cursor-pointer px-6 py-2 border-2 border-gray-300 rounded-md text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300 hover:shadow-md transition-all duration-200 mb-1"
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  </div>
</template>