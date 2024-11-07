<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">User Details</h1>
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else class="bg-white p-4 border rounded shadow-lg">
      <p><strong>Name:</strong> {{ user?.name }}</p>
      <p><strong>Contact Number:</strong> {{ user?.phone }}</p>
      <p><strong>Email:</strong> {{ user?.email }}</p>
      <button
        @click="goBack"
        class="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
      >
        Go Back
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const userId = Number(route.params.id)
const user = ref(userStore.users.find((u) => u.id === userId) || null)
const loading = ref(false)

async function fetchUser() {
  loading.value = true
  await userStore.fetchUsers()
  user.value = userStore.users.find((u) => u.id === userId) || null
  loading.value = false
}

function goBack() {
  router.push('/')
}

onMounted(() => {
  if (!user.value) fetchUser()
})
</script>

<style scoped>
/* Additional styling if needed */
</style>
