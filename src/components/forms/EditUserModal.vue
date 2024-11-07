<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 class="text-lg font-bold mb-4">Edit User</h2>
      <label class="block mb-3">
        Name:
        <input v-model="formData.name" class="border rounded p-2 mt-1 w-full" />
      </label>
      <label class="block mb-3">
        Contact Number:
        <input v-model="formData.phone" class="border rounded p-2 mt-1 w-full" />
      </label>
      <label class="block mb-3">
        Email:
        <input v-model="formData.email" class="border rounded p-2 mt-1 w-full" />
      </label>
      <div class="mt-4 flex justify-end">
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
        >
          Cancel
        </button>
        <button
          @click="saveEdit"
          class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from 'vue'
import type { User } from '@/stores/user'

const props = defineProps<{
  isOpen: boolean
  user: User | null
}>()

const emits = defineEmits<{
  (e: 'close'): void
  (e: 'save', user: User): void
}>()

// Set formData to a ref with a default value to prevent it from being null
const formData = ref<User>({
  id: 0,
  name: '',
  phone: '',
  email: '',
})

// Watch for changes to the user prop and update formData accordingly
watch(
  () => props.user,
  (newUser) => {
    if (newUser) {
      formData.value = { ...newUser }
    }
  },
  { immediate: true },
)

function closeModal() {
  emits('close')
}

function saveEdit() {
  if (formData.value) {
    emits('save', formData.value)
    closeModal()
  }
}
</script>

<style scoped>
/* Add any additional styling for the modal if needed */
</style>
