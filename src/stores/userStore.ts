import { defineStore } from 'pinia'
import { addUser, fetchUsers, updateUser, deleteUser } from '@/services/api'
import type { User } from '@/types/User'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    lastUserID: 10,
    users: [] as User[],
    todos: [],
    loading: false,
  }),
  actions: {
    async loadUsers() {
      this.loading = true
      const response = await fetchUsers()
      this.users = response.data as User[]
      this.loading = false
    },
    async addUser(newUser: User) {
      // newUser.id = this.users.length + 1
      await addUser(newUser)
      this.users.push({ ...newUser, id: this.lastUserID + 1 })
      this.lastUserID = this.lastUserID + 1
    },
    async editUser(userId: number, updatedUser: User) {
      console.log(userId, 'edit user')
      if (userId <= 10) await updateUser(userId, updatedUser) // avoid unsupported id on jsonplaceholder
      const index = this.users.findIndex((user) => user.id === updatedUser.id)
      if (index !== -1) this.users[index] = updatedUser
    },
    async removeUser(userId: number) {
      await deleteUser(userId)
      this.users = this.users.filter((user) => user.id !== userId)
      // await this.loadUsers() for real server behavior
    },
  },
})
