<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useClaimStore } from '@/stores/claims'
import ProfileMenu from '@/components/ProfileMenu.vue'

const router = useRouter()
const claimStore = useClaimStore()

const itemTitle = ref('')
const category = ref('')
const description = ref('')
const reportType = ref('') // 'lost' or 'found'
const errorMessage = ref('')
const isSubmitting = ref(false)

const handleSubmit = async () => {
  errorMessage.value = ''

  if (!itemTitle.value.trim()) {
    errorMessage.value = 'Item Title is required.'
    return
  }
  if (!description.value.trim()) {
    errorMessage.value = 'Description & Details are required.'
    return
  }
  if (!reportType.value) {
    errorMessage.value = 'Please select if this is a lost or found item.'
    return
  }

  isSubmitting.value = true

  try {
    await claimStore.createClaim({
      title: itemTitle.value.trim(),
      description: description.value.trim(),
      status: reportType.value === 'found' ? 'FOUND' : 'NOT FOUND',
      requesterId: 'e20230530',
    } as any)

    // Goes back to /claims for students, or /admin/inbox for staff
    router.back()
  } catch (err) {
    errorMessage.value = 'Failed to submit report. Make sure json-server is running.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <!-- Top Navigation Bar -->
    <header class="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md shrink-0">
      <div class="flex items-center gap-3 cursor-pointer" @click="router.back()">
        <img src="@/assets/Logo.png" alt="ITC Logo" class="w-11 h-11 rounded-full bg-white object-contain shadow-sm" />
        <h1 class="text-xl font-bold tracking-wider">I.T.C.</h1>
      </div>
      <ProfileMenu />
    </header>

    <main class="flex-grow flex justify-center p-8 w-full">
      <div class="w-full max-w-4xl">
        
        <!-- Main Title -->
        <h2 class="text-3xl font-normal text-gray-900 text-center mb-10">Report Lost / Claim Found Item</h2>
        
        <!-- Error Message Banner -->
        <div v-if="errorMessage" class="mb-6 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleSubmit" class="flex flex-col gap-6 w-full">
          
          <!-- Item Title -->
          <div class="flex flex-col gap-1">
            <label for="itemTitle" class="text-gray-800 text-lg">Item Title</label>
            <input 
              id="itemTitle" 
              v-model="itemTitle" 
              type="text" 
              class="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-900 transition-colors text-gray-900"
            />
          </div>

          <!-- Category -->
          <div class="flex flex-col gap-1">
            <label for="category" class="text-gray-800 text-lg">Category</label>
            <select 
              id="category" 
              v-model="category"
              class="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-900 transition-colors text-gray-900 cursor-pointer bg-white"
            >
              <option value="" disabled>---</option>
              <option value="electronic">Electronic</option>
              <option value="personal">Personal Items</option>
              <option value="school">School property</option>
            </select>
          </div>

          <!-- Description & Details -->
          <div class="flex flex-col gap-1">
            <label for="description" class="text-gray-800 text-lg">Description & Details</label>
            <textarea 
              id="description" 
              v-model="description" 
              rows="6"
              class="w-full px-4 py-2 border-2 border-gray-400 rounded-md focus:outline-none focus:border-blue-900 transition-colors text-gray-900 resize-y"
            ></textarea>
          </div>

          <!-- Report Type (Lost / Found Checkboxes/Radios) -->
          <div class="flex flex-col gap-3">
            <span class="text-gray-800 text-lg">Report:</span>
            <div class="flex gap-8">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" value="lost" v-model="reportType" name="reportType" class="w-5 h-5 text-blue-900 focus:ring-blue-900 border-gray-400 cursor-pointer" />
                <span class="text-gray-800 group-hover:text-blue-800 transition-colors">A lost Item</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input type="radio" value="found" v-model="reportType" name="reportType" class="w-5 h-5 text-blue-900 focus:ring-blue-900 border-gray-400 cursor-pointer" />
                <span class="text-gray-800 group-hover:text-blue-800 transition-colors">A found Item</span>
              </label>
            </div>
          </div>

          <!-- Image Upload Box -->
          <div class="flex flex-col gap-2 mt-4">
            <span class="text-gray-800 text-lg">Attach image for proof of ownership (max 2MB)</span>
            <label class="w-full border-2 border-gray-400 rounded-md p-4 flex items-center gap-6 cursor-pointer hover:bg-gray-50 transition-colors group">
              <!-- Crossed Box Placeholder -->
              <div class="w-24 h-24 border-2 border-gray-400 border-solid flex items-center justify-center relative overflow-hidden bg-white shrink-0">
                <svg class="absolute inset-0 w-full h-full text-gray-400" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" stroke-width="1.5" />
                  <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" stroke-width="1.5" />
                </svg>
              </div>
              <span class="text-gray-600 group-hover:text-blue-700 transition-colors text-lg">Image (optional)</span>
              <!-- Hidden actual file input -->
              <input type="file" accept="image/*" class="hidden" />
            </label>
          </div>

          <!-- Footer Buttons -->
          <div class="flex justify-end gap-4 mt-8">
            <button 
              type="button"
              @click="router.push('/claims')"
              class="cursor-pointer px-6 py-2 border-2 border-gray-400 rounded-md text-gray-800 font-medium hover:bg-gray-100 hover:border-gray-500 transition-all duration-200 shadow-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              :disabled="isSubmitting"
              class="cursor-pointer px-6 py-2 border-2 border-gray-400 rounded-md text-gray-800 font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-400 hover:shadow-md transition-all duration-200 disabled:opacity-50 shadow-sm"
            >
              <span v-if="isSubmitting">Submitting...</span>
              <span v-else>Submit Report</span>
            </button>
          </div>

        </form>
      </div>
    </main>
  </div>
</template>