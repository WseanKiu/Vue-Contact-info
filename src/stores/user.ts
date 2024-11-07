import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface User {
  id: number
  name: string
  phone: string
  email: string
}

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)

  async function fetchUsers() {
    loading.value = true
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users')
      users.value = response.data
    } finally {
      loading.value = false
    }
  }

  async function addUser(newUser: User) {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser)
      // API might return a new user ID, but here we use a mock increment for simplicity
      newUser.id = response.data.id || users.value.length + 1
      users.value.push(newUser)
    } catch (error) {
      console.error('Failed to add user:', error)
    }
  }

  async function editUser(updatedUser: User) {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser)
      const index = users.value.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) users.value[index] = updatedUser
    } catch (error) {
      console.error('Failed to edit user:', error)
    }
  }

  async function deleteUser(userId: number) {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`)
      users.value = users.value.filter((user) => user.id !== userId)
    } catch (error) {
      console.error('Failed to delete user:', error)
    }
  }

  return { users, loading, fetchUsers, addUser, editUser, deleteUser }
})
