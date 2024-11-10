<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
      <form @submit.prevent="saveUser">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Edit User</h2>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Name:</label>
          <input
            v-model="userData.name"
            type="text"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Contact Number:</label>
          <input
            v-model="userData.phone"
            type="text"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 font-medium mb-1">Email:</label>
          <input
            v-model="userData.email"
            type="email"
            class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div class="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            @click="$emit('close')"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 focus:outline-none"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import type { User } from '@/types/User'

interface Props {
  user: User | null
}

const props = defineProps<Props>()
const emit = defineEmits(['close', 'save'])

const userData = ref({ ...props.user })

watch(
  () => props.user,
  (newUser) => {
    userData.value = { ...newUser }
  },
  { immediate: true },
)

function saveUser() {
  emit('save', userData.value)
}
</script>

<style scoped></style>
