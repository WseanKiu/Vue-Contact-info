<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold mb-4">Contact Information</h1>
    <h2>test {{ users }}</h2>
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <ul v-else class="space-y-4">
      <li v-for="user in users" :key="user.id" class="p-4 border rounded-lg">
        <h2 class="text-xl font-semibold">{{ user.name }}</h2>
        <p>Email: {{ user.email }}</p>
        <p>Phone: {{ user.phone }}</p>
        <p>Website: {{ user.website }}</p>
        {{ users }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const { fetchUsers, users, loading } = userStore

onMounted(() => {
  if (!users.length) fetchUsers()
})
</script>

<style scoped>
/* Additional styling if needed */
</style>
