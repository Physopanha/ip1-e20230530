<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Form state
const studentId = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)
const showPassword = ref(false) // Controls password visibility

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Handle form submission and M1 client-side validation
const handleLogin = async () => {
  errorMessage.value = ''
  
  if (!studentId.value.trim()) {
    errorMessage.value = 'Username is required.'
    return
  }
  if (!password.value.trim()) {
    errorMessage.value = 'Password is required.'
    return
  }
  
  const firstLetter = studentId.value.toLowerCase().charAt(0)
  if (studentId.value.toLowerCase() !== 'admin' && !['e', 'i', 't'].includes(firstLetter)) {
    errorMessage.value = 'Enter the correct Username.'
    return
  }

  isLoading.value = true
  
  setTimeout(() => {
    isLoading.value = false
    if (studentId.value === 'admin') {
      router.push('/admin/inbox')
    } else {
      router.push('/claims')
    }
  }, 500)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Top Navigation Bar -->
    <header class="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md">
      <div class="flex items-center gap-3">
        <img 
          src="@/assets/Logo.png" 
          alt="ITC Logo" 
          class="w-11 h-11 rounded-full bg-white object-contain shadow-sm"
        />
        <h1 class="text-xl font-bold tracking-wider">ITC</h1>
      </div>
      <div class="text-right text-sm">
        <p class="font-semibold">Student</p>
        <p>Association</p>
      </div>
    </header>

    <!-- Centered Login Form -->
    <main class="flex-grow flex items-center justify-center p-4">
      <div class="bg-white rounded-xl shadow-lg w-full max-w-md p-10 border border-gray-100">
        
        <!-- Header Text -->
        <h2 class="text-3xl font-bold text-slate-800 mb-2">Welcome back</h2>
        <p class="text-gray-500 mb-8">Log in to Student Lost and Found Portal</p>
        
        <!-- Error Message Banner -->
        <div v-if="errorMessage" class="mb-6 p-3 bg-red-100 text-red-700 text-sm rounded-md border border-red-200">
          {{ errorMessage }}
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          
          <!-- Username Input -->
          <div>
            <label for="studentId" class="block text-base text-slate-800 mb-2">
              Username
            </label>
            <input 
              id="studentId" 
              v-model="studentId" 
              type="text" 
              class="w-full px-4 py-3 bg-[#eef3fb] border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-colors text-gray-800"
            />
          </div>

          <!-- Password Input Group -->
          <div>
            <label for="password" class="block text-base text-slate-800 mb-2">
              Password
            </label>
            <div class="flex">
              <input 
                id="password" 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                class="w-full px-4 py-3 bg-[#eef3fb] border border-gray-200 rounded-l-lg focus:ring-2 focus:ring-blue-900 focus:border-blue-900 outline-none transition-colors text-gray-800"
              />
              <button 
                type="button" 
                @click="togglePassword"
                class="bg-green-700 hover:bg-green-800 text-white px-4 rounded-r-lg flex items-center justify-center transition-colors border border-green-700"
              >
                <!-- SVG Eye Icon -->
                <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <!-- SVG Eye Slash Icon -->
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            :disabled="isLoading"
            class="w-full bg-[#0a153a] hover:bg-[#060e29] text-white font-semibold py-3 px-4 rounded-lg mt-2 transition-colors disabled:opacity-70 flex justify-center items-center"
          >
            <span v-if="isLoading">Logging in...</span>
            <span v-else>Log in</span>
          </button>
        </form>

      </div>
    </main>
  </div>
</template>