<template>
  <div class="p-6">
    <h2 class="text-2xl/7 font-bold text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
      Contact Information
    </h2>
    <div class="flex justify-between mb-4">
      <button
        @click="openAddModal"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add User
      </button>

      <!-- Toggle Grid/Table View -->
      <div class="flex items-center space-x-4">
        <button @click="toggleView" class="text-sm bg-gray-200 p-2 rounded">
          {{ isGridView ? 'Switch to Table View' : 'Switch to Grid View' }}
        </button>
      </div>
    </div>

    <div v-if="loading" class="text-center text-gray-500">Loading...</div>

    <!-- Grid View -->
    <div v-if="!loading && isGridView" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="user in users"
        :key="user.id"
        class="border p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer"
        @click="goToUserDetails(user.id)"
      >
        <h3 class="font-semibold text-lg">{{ user.name }}</h3>
        <p class="text-sm text-gray-600">{{ user.phone }}</p>
        <p class="text-sm text-gray-600">{{ user.email }}</p>
        <div class="mt-2 flex justify-between">
          <button
            @click.stop="openEditModal(user)"
            class="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Edit
          </button>
          <button
            @click.stop="deleteUser(user.id)"
            class="text-red-500 hover:text-red-700 font-semibold"
          >
            Delete
          </button>
        </div>
      </div>
    </div>

    <!-- Table View -->
    <table v-else class="min-w-full bg-white border rounded-lg shadow">
      <thead>
        <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-left">Contact Number</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-700 text-sm font-light">
        <tr
          v-for="user in users"
          :key="user.id"
          @click="goToUserDetails(user.id)"
          class="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
        >
          <td class="py-3 px-6 text-left">{{ user.name }}</td>
          <td class="py-3 px-6 text-left">{{ user.phone }}</td>
          <td class="py-3 px-6 text-left">{{ user.email }}</td>
          <td class="py-3 px-6 text-center">
            <button
              @click.stop="openEditModal(user)"
              class="text-blue-500 hover:text-blue-700 font-semibold mx-2"
            >
              Edit
            </button>
            <button
              @click.stop="deleteUser(user.id)"
              class="text-red-500 hover:text-red-700 font-semibold mx-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed, defineEmits } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import type { User } from '@/types/User'

const userStore = useUserStore()
const router = useRouter()
const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)

const isGridView = ref(false)
const emit = defineEmits(['add', 'edit', 'delete'])

onMounted(() => {
  if (!users.value.length) userStore.loadUsers()
})

const toggleView = () => {
  isGridView.value = !isGridView.value
}

function goToUserDetails(userId: number) {
  router.push({ name: 'UserDetails', params: { id: userId } })
}

function openAddModal() {
  emit('add')
}

function openEditModal(user: User) {
  emit('edit', user)
}

async function deleteUser(userId: number) {
  await userStore.removeUser(userId)
}
</script>

<style scoped></style>
