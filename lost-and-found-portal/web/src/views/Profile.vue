<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ProfileMenu from '@/components/ProfileMenu.vue'

const router = useRouter()

const fullName = ref('Student User')
const userID = ref('e2023530')
const email = ref('hello@gmail.com')
const telephone = ref('0123456789')
const savedMessage = ref(false)
const errors = ref({
  fullName: '',
  email: '',
  telephone: ''
})

const handleSave = () => {
  savedMessage.value = false
  errors.value = { fullName: '', email: '', telephone: '' }

  let hasError = false

  if (!fullName.value.trim()) {
    errors.value.fullName = 'Full Name cannot be empty.'
    hasError = true
  }
  if (!email.value.trim()) {
    errors.value.email = 'Email cannot be empty.'
    hasError = true
  }
  if (!telephone.value.trim()) {
    errors.value.telephone = 'Telephone cannot be empty.'
    hasError = true
  }

  if (hasError) return

  savedMessage.value = true
  setTimeout(() => {
    savedMessage.value = false
  }, 2000)
}
</script>

<template>
    <div class="min-h-screen bg-gray-50 flex flex-col">
        <header class="bg-blue-900 text-white p-4 flex justify-between items-center shadow-md shrink-0">
            <div class="flex items-center gap-3 cursor-pointer" @click="router.back()">
                <img src="@/assets/Logo.png" alt="ITC Logo" class="w-11 h-11 rounded-full bg-white object-contain shadow-sm">
                <h1 class="text-xl font-bold tracking-wider">ITC</h1>
            </div>
            <ProfileMenu />
        </header>
        <main class="flex-grow flex justify-center items-start p-8">
            <div class="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <button @click="router.back()" class="cursor-pointer mb-6 flex items-center text-gray-500 hover:text-blue-700 hover:bg-blue-50 px-3 py-1.5 -ml-3 rounded-md font-medium transition-all duration-200 w-fit">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back
                    </button>
                <h2 class="text-2xl font-bold text-gray-900 mb-6">Edit Profile</h2>
                <form @submit.prevent="handleSave" class="space-y-5">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">ID</label>
                        <input type="text" v-model="userID" disabled class="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-500 cursor-not-allowed">
                    </div>
                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                      <p v-if="errors.fullName" class="text-red-600 text-xs font-medium mb-1">
                        {{ errors.fullName }}
                      </p>
                      <input
                        type="text"
                        v-model="fullName"
                        @input="errors.fullName = ''"
                        :class="errors.fullName ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'"
                        class="w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
                      <p v-if="errors.email" class="text-red-600 text-xs font-medium mb-1">
                        {{ errors.email }}
                      </p>
                      <input
                        type="email"
                        v-model="email"
                        @input="errors.email = ''"
                        :class="errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'"
                        class="w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2"
                      />
                    </div>

                    <div>
                      <label class="block text-sm font-semibold text-gray-700 mb-1">Telephone</label>
                      <p v-if="errors.telephone" class="text-red-600 text-xs font-medium mb-1">
                        {{ errors.telephone }}
                      </p>
                      <input
                        type="tel"
                        v-model="telephone"
                        @input="errors.telephone = ''"
                        :class="errors.telephone ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-500'"
                        class="w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2"
                      />
                    </div>
                    <div class="flex items-center justify-end gap-3 pt-4">
                        <span v-if="savedMessage" class="text-sm font-medium text-green-600">Profile updated!</span>
                        <button type="button" @click="router.back()" class="cursor-pointer px-5 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-100 transition-colors">Cancel</button>
                        <button type="submit" class="cursor-pointer px-6 py-2 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 hover:shadow-md transition-all duration-200">Save Changes</button>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>