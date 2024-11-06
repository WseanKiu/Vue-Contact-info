// src/stores/useUserStore.ts
import { defineStore } from 'pinia'
import axios from 'axios'

export type User = {
  id: number
  name: string
  email: string
  phone: string
  website: string
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [] as User[],
    loading: false,
  }),
  actions: {
    async fetchUsers() {
      this.loading = true
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users')
        this.users = response.data
        console.log(response.data)
      } catch (error) {
        console.error('Failed to fetch users:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
