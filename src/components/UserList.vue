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
    </div>
    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
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

    <!-- Edit User Modal -->
    <EditUserModal
      :isOpen="isModalOpen"
      :user="editingUser"
      @close="closeModal"
      @save="handleSaveUser"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore, type User } from '@/stores/user'
import EditUserModal from '@/components/forms/EditUserModal.vue'

const userStore = useUserStore()
const router = useRouter()
const users = computed(() => userStore.users)
const loading = computed(() => userStore.loading)

const isModalOpen = ref(false)
const editingUser = ref<User | null>(null)

onMounted(() => {
  if (!users.value.length) userStore.fetchUsers()
})

function goToUserDetails(userId: number) {
  router.push({ name: 'UserDetails', params: { id: userId } })
}

function openAddModal() {
  editingUser.value = { id: 0, name: '', phone: '', email: '' } // New user template
  isModalOpen.value = true
}

function openEditModal(user: User) {
  editingUser.value = user
  isModalOpen.value = true
}

function closeModal() {
  isModalOpen.value = false
}

async function handleSaveUser(user: User) {
  if (user.id === 0) {
    // New user
    await userStore.addUser(user)
  } else {
    // Existing user edit
    await userStore.editUser(user)
  }
  closeModal()
}

async function deleteUser(userId: number) {
  await userStore.deleteUser(userId)
}
</script>

<style scoped></style>
