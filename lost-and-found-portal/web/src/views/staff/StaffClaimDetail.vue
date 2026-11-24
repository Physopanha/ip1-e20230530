<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useClaimStore } from '@/stores/claims'
import ProfileMenu from '@/components/ProfileMenu.vue'

const route = useRoute()
const router = useRouter()
const claimStore = useClaimStore()

const claimId = route.params.id as string
const selectedStatus = ref('')
const isSaving = ref(false)
const saveSuccess = ref(false)

onMounted(() => {
  if (claimStore.claims.length === 0) {
    claimStore.fetchClaims()
  }
})

const claim = computed(() => claimStore.claims.find(c => c.id === claimId))

// Sync dropdown with the loaded claim's status
watch(
  claim,
  (newClaim) => {
    if (newClaim) {
      selectedStatus.value = newClaim.status
    }
  },
  { immediate: true }
)

const handleSaveChanges = async () => {
  if (!claim.value) return
  isSaving.value = true
  saveSuccess.value = false
  try {
    await claimStore.updateClaimStatus(claimId, selectedStatus.value)
    saveSuccess.value = true
    setTimeout(() => {
      saveSuccess.value = false
    }, 2000)
  } catch (err) {
    alert('Failed to save changes. Make sure json-server is running.')
  } finally {
    isSaving.value = false
  }
}

const handleDelete = async () => {
  const confirmed = confirm('Are you sure you want to delete this item?')
  if (!confirmed) return
  try {
    await claimStore.deleteClaim(claimId)
    router.push('/admin/inbox')
  } catch (err) {
    alert('Failed to delete the item. Make sure json-server is running.')
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Top Navigation Bar -->
    <!-- Top Navigation Bar -->
    <header class="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md shrink-0">
      <div class="flex items-center gap-3 cursor-pointer" @click="router.push('/admin/inbox')">
        <img src="@/assets/Logo.png" alt="ITC Logo" class="w-11 h-11 rounded-full bg-white object-contain shadow-sm" />
        <h1 class="text-xl font-bold tracking-wider">I.T.C.</h1>
      </div>
      <ProfileMenu />
    </header>

    <!-- Full Screen Main Content -->
    <main class="flex-grow p-8 w-full flex flex-col relative">
      <!-- Back Navigation -->
      <button
        @click="router.push('/admin/inbox')"
        class="cursor-pointer mb-8 flex items-center text-gray-500 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 -ml-3 rounded-md font-medium transition-all duration-200 w-fit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Inbox
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
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Image Placeholder -->
          <div class="w-full md:w-[400px] aspect-square bg-gray-50 border-2 border-gray-400 border-solid flex items-center justify-center relative overflow-hidden shrink-0">
            <svg class="absolute inset-0 w-full h-full text-gray-400" preserveAspectRatio="none" viewBox="0 0 100 100">
              <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" stroke-width="1.5" />
              <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" stroke-width="1.5" />
            </svg>
          </div>

          <!-- Right Side Details -->
          <div class="flex flex-col pt-2">
            <h2 class="text-4xl font-normal text-gray-900 mb-4">{{ claim.title }}</h2>
            <p class="text-gray-700 text-lg leading-relaxed mb-6 max-w-2xl font-serif italic">
              {{ claim.description }}
            </p>

            <!-- Staff Status Dropdown -->
            <div class="flex items-center gap-3 mb-8">
              <span class="text-lg text-gray-800">Status:</span>
              <select
                v-model="selectedStatus"
                class="cursor-pointer px-4 py-2 border-2 border-gray-300 rounded-md bg-white text-gray-800 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
              >
                <option value="FOUND">Found</option>
                <option value="NOT FOUND">Not found</option>
              </select>
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
          <div class="flex flex-col gap-2">
            <div class="text-2xl text-gray-900 mb-1">
              <span class="font-normal">Telephone:</span><br />
              <span class="text-xl">123456789</span>
            </div>
            <div class="text-2xl text-gray-900 mb-6">
              <span class="font-normal">Email:</span><br />
              <span class="text-xl">hello@gmail.com</span>
            </div>

            <div>
              <button class="cursor-pointer px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-800 font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                Contact SA Staff
              </button>
            </div>
          </div>

          <!-- Bottom Right Action Buttons -->
          <div class="flex items-center gap-3 mb-1">
            <span v-if="saveSuccess" class="text-sm font-medium text-green-600">
              Saved!
            </span>

            <button
              @click="handleSaveChanges"
              :disabled="isSaving"
              class="cursor-pointer disabled:cursor-not-allowed px-6 py-2 bg-blue-900 text-white text-sm font-bold rounded-md hover:bg-blue-800 hover:shadow-md transition-all duration-200 disabled:opacity-60"
            >
              {{ isSaving ? 'Saving...' : 'Save Changes' }}
            </button>

            <button
              @click="handleDelete"
              class="cursor-pointer px-6 py-2 border-2 border-gray-300 rounded-md text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-700 hover:border-red-300 hover:shadow-md transition-all duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>