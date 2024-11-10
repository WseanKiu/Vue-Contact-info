<template>
  <MainLayout>
    <UserList @add="handleAddUser" @edit="handleEditUser" @delete="handleDeleteUser" />
    <EditUserModal
      v-if="isEditModalOpen"
      :user="selectedUser"
      @close="closeModal"
      @save="handleSaveUser"
    />
  </MainLayout>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/userStore'
// import { useTodoStore } from '@/stores/todoStore'
import type { User } from '@/types/User'
import UserList from '@/components/UserList.vue'
import EditUserModal from '@/components/modals/EditUserModal.vue'

const userStore = useUserStore()
// const todoStore = useTodoStore()

// State variables to manage the edit modal and selected user
const isEditModalOpen = ref(false)
const selectedUser = ref<User | null>(null)
console.log('123123')
// Fetch users when component mounts
onMounted(() => {
  if (!userStore.users.length) userStore.loadUsers()
  // if (!todoStore.todos.length) todoStore.loadTodos()
})

watch(
  () => isEditModalOpen.value,
  (modal) => console.log('123123', isEditModalOpen, modal),
)

function handleAddUser() {
  selectedUser.value = { id: 0, name: '', phone: '', email: '' }
  isEditModalOpen.value = true
}

// Handle the edit action
function handleEditUser(user: User) {
  console.log('handleEditUser called with user:', user)
  selectedUser.value = { ...user }
  isEditModalOpen.value = true
  console.log('isEditModalOpen:', isEditModalOpen.value)
}

// Save the edited user data
async function handleSaveUser(user: User) {
  if (user.id === 0) {
    // New user
    await userStore.addUser(user)
  } else {
    // Existing user edit
    await userStore.editUser(user.id, user)
  }
  isEditModalOpen.value = false // Close the modal
}

function closeModal() {
  isEditModalOpen.value = false
}

// Handle the delete action
function handleDeleteUser(userId: number) {
  userStore.removeUser(userId)
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
