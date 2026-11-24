<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useClaimStore } from '@/stores/claims'
import ProfileMenu from '@/components/ProfileMenu.vue'

const router = useRouter()
const claimStore = useClaimStore()

const searchQuery = ref('')
const selectedCategories = ref<string[]>([])
const selectedLocation = ref('Library')

const locations = [
  'Library', 'Building A', 'Building B', 'Building C',
  'Building D', 'Building E', 'Building F', 'Building G',
  'Building H', 'Building I', 'Building J', 'Parking lot'
]

onMounted(() => {
  claimStore.fetchClaims()
})

const filteredClaims = computed(() => {
  let result = claimStore.claims
  if (searchQuery.value) {
    result = result.filter(c =>
      c.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }
  return result
})

const updateStatus = async (claim: any, newStatus: string) => {
  try {
    await claimStore.updateClaimStatus(claim.id, newStatus)
  } catch (err) {
    alert('Failed to update status.')
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Top Navigation Bar -->
    <header class="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md shrink-0">
      <div class="flex items-center gap-3 w-1/4 cursor-pointer" @click="router.push('/admin/inbox')">
        <img src="@/assets/Logo.png" alt="ITC Logo" class="w-11 h-11 rounded-full bg-white object-contain shadow-sm" />
        <h1 class="text-xl font-bold tracking-wider">I.T.C.</h1>
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

      <!-- Staff Profile Dropdown -->
      <div class="w-1/4 flex justify-end">
        <ProfileMenu />
      </div>
    </header>

    <!-- Main Layout -->
    <div class="flex flex-grow overflow-hidden">
      <!-- Left Sidebar -->
      <aside class="w-64 bg-white border-r border-gray-200 flex flex-col overflow-y-auto shrink-0 p-6">
        <div class="mb-8">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Category</h3>
          <div class="space-y-3">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value="Electronic" v-model="selectedCategories" class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              <span class="text-gray-700">Electronic</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value="Personal items" v-model="selectedCategories" class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              <span class="text-gray-700">Personal items</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" value="School property" v-model="selectedCategories" class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              <span class="text-gray-700">School property</span>
            </label>
          </div>
        </div>

        <div>
          <h3 class="text-lg font-bold text-gray-800 mb-4">Last seen</h3>
          <select
            v-model="selectedLocation"
            class="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 cursor-pointer"
          >
            <option v-for="loc in locations" :key="loc" :value="loc">
              {{ loc }}
            </option>
          </select>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="flex-grow p-6 overflow-y-auto flex flex-col">
        <!-- Top Right Post Button -->
        <div class="flex justify-end mb-4">
          <button
            @click="router.push('/report')"
            class="cursor-pointer bg-white border border-gray-300 shadow-sm text-gray-700 font-semibold py-2 px-6 rounded-md hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200"
          >
            Post
          </button>
        </div>

        <!-- Error / Loading / Empty States -->
        <div v-if="claimStore.error" class="bg-red-50 text-red-600 p-4 rounded-lg text-center mb-6">
          {{ claimStore.error }}
        </div>

        <div v-else-if="claimStore.isLoading" class="flex-grow flex items-center justify-center">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>

        <div v-else-if="filteredClaims.length === 0" class="flex-grow flex flex-col items-center justify-center text-gray-500">
          <p class="text-lg">No items found.</p>
        </div>

        <!-- Vertical List of Horizontal Cards -->
        <div v-else class="flex flex-col gap-4 mb-8">
          <div
            v-for="claim in filteredClaims"
            :key="claim.id"
            @click="router.push(`/admin/claims/${claim.id}`)"
            class="bg-white border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer flex items-center gap-5 relative"
          >
            <!-- Thumbnail Placeholder -->
            <div class="w-24 h-24 bg-gray-100 border-2 border-gray-300 rounded-md flex items-center justify-center relative overflow-hidden shrink-0">
              <svg class="absolute inset-0 w-full h-full text-gray-300" preserveAspectRatio="none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" stroke-width="2" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>

            <!-- Item Details -->
            <div class="flex-grow min-w-0 pr-10">
              <h4 class="font-bold text-gray-900 text-lg truncate">{{ claim.title }}</h4>
              <p class="text-sm text-gray-600 line-clamp-1 mb-3">{{ claim.description }}</p>

              <!-- Inline Status Dropdown (stopPropagation prevents opening detail page when changing status) -->
              <div class="flex items-center gap-2" @click.stop>
                <span class="text-sm font-medium text-gray-700">Status:</span>
                <select
                  :value="claim.status"
                  @change="updateStatus(claim, ($event.target as HTMLSelectElement).value)"
                  class="cursor-pointer text-sm px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-800 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
                >
                  <option value="FOUND">Found</option>
                  <option value="NOT FOUND">Not found</option>
                </select>
              </div>
            </div>

            <!-- Top-right "..." Menu Button -->
            <button
              @click.stop="router.push(`/admin/claims/${claim.id}`)"
              class="cursor-pointer absolute top-3 right-3 p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
              title="View Details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Pagination Footer -->
        <div class="mt-auto flex justify-between items-center pt-6 border-t border-gray-200 text-gray-600 font-medium">
          <button class="cursor-pointer disabled:cursor-not-allowed px-4 py-2 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200 disabled:opacity-50">
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