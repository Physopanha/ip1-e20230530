<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useClaimStore } from '@/stores/claims'

const claimStore = useClaimStore()

// Wireframe Sidebar State
const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const selectedLocation = ref('Library')

const locations = [
  'Library', 'Building A', 'Building B', 'Building C', 
  'Building D', 'Building E', 'Building F', 'Building G', 
  'Building H', 'Building I', 'Building J', 'Parking lot'
]

// Fetch data from json-server when the page loads
onMounted(() => {
  claimStore.fetchClaims()
})

// Optional: Basic frontend filtering based on the search/sidebar
const filteredClaims = computed(() => {
  let result = claimStore.claims
  if (searchQuery.value) {
    result = result.filter(c => c.title.toLowerCase().includes(searchQuery.value.toLowerCase()))
  }
  return result
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Top Navigation Bar -->
    <header class="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md shrink-0">
      <!-- Logo -->
      <div class="flex items-center gap-3 w-1/4">
        <img src="@/assets/Logo.png" alt="ITC Logo" class="w-11 h-11 rounded-full bg-white object-contain shadow-sm" />
        <h1 class="text-xl font-bold tracking-wider">ITC</h1>
      </div>

      <!-- Center Search Bar -->
      <div class="w-1/2 flex justify-center">
        <div class="relative w-full max-w-lg text-gray-900">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="search" 
            class="w-full pl-10 pr-4 py-2 rounded-full bg-white border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <!-- User Profile Icon -->
      <div class="w-1/4 flex justify-end">
        <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center text-blue-900 shadow-sm cursor-pointer hover:bg-blue-100 hover:scale-105 hover:shadow-md transition-all duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
      </div>
    </header>

    <!-- Main Layout: Sidebar + Content -->
    <div class="flex flex-grow overflow-hidden">
      
      <!-- Left Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto shrink-0 p-6">
        <!-- Categories -->
        <div class="mb-8">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Category</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value="Electronic" v-model="selectedCategories" class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span class="text-gray-700">Electronic</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value="Personal Items" v-model="selectedCategories" class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span class="text-gray-700">Personal Items</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value="School property" v-model="selectedCategories" class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
              <span class="text-gray-700">School property</span>
            </label>
          </div>
        </div>

        <!-- Last Seen -->
        <div>
          <h3 class="text-lg font-bold text-gray-800 mb-4">Last seen</h3>
          <select 
            v-model="selectedLocation"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700"
          >
            <option v-for="loc in locations" :key="loc" :value="loc">
              {{ loc }}
            </option>
          </select>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-grow p-6 overflow-y-auto flex flex-col">
        <!-- Action Bar -->
        <div class="mb-6">
          <button 
            @click="$router.push('/report')"
            class="cursor-pointer bg-white border border-gray-300 shadow-sm text-gray-700 font-semibold py-2 px-6 rounded-md hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200">
            Post
          </button>
        </div>

        <!-- M1 Requirement: Error State -->
        <div v-if="claimStore.error" class="bg-red-50 text-red-600 p-4 rounded-lg text-center mb-6">
          {{ claimStore.error }}
        </div>

        <!-- M1 Requirement: Loading State -->
        <div v-else-if="claimStore.isLoading" class="flex-grow flex items-center justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
        
        <!-- M1 Requirement: Empty State -->
        <div v-else-if="filteredClaims.length === 0" class="flex-grow flex flex-col items-center justify-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p class="text-lg">No items found.</p>
        </div>

        <!-- Grid Layout -->
        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <!-- Item Card -->
          <div 
            v-for="claim in filteredClaims" 
            :key="claim.id"
            class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            @click="$router.push(`/claims/${claim.id}`)"
          >
            <!-- Image Placeholder matching wireframe crossed box -->
            <div class="w-full aspect-square bg-gray-100 border-2 border-gray-200 border-dashed rounded-md flex items-center justify-center mb-4 relative overflow-hidden">
              <svg class="absolute inset-0 w-full h-full text-gray-200" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" stroke-width="2" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
            
            <!-- Card Details -->
            <h4 class="font-bold text-gray-800 text-lg mb-1 truncate">{{ claim.title }}</h4>
            <p class="text-sm text-gray-600 line-clamp-2 mb-2">{{ claim.description }}</p>
            <div class="flex justify-between items-center text-xs mt-auto">
              <span class="px-2 py-1 bg-gray-100 rounded-md text-gray-600 font-medium">Status: {{ claim.status }}</span>
              <span class="text-gray-400">ID: {{ claim.id }}</span>
            </div>
          </div>
        </div>

        <!-- Pagination Footer -->
        <div class="mt-auto flex justify-between items-center pt-6 border-t border-gray-200 text-gray-600 font-medium">
          <button class="cursor-pointer disabled:cursor-not-allowed px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:hover:bg-white disabled:hover:text-gray-600 disabled:hover:border-gray-300 disabled:hover:shadow-sm">
            &lt; Previous
          </button>
          <span>1/2</span>
          <button class="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200">
            Next &gt;
          </button>
        </div>
      </main>
    </div>
  </div>
</template>