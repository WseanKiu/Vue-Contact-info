import type { Todo } from '@/types/Todo'
import type { User } from '@/types/User'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { 'Content-Type': 'application/json' },
})

export const fetchUsers = () => api.get('/users')
export const addUser = (newUser: User) => api.post(`/users`, newUser)
export const updateUser = (userId: number, data: object) => api.put(`/users/${userId}`, data)
export const deleteUser = (userId: number) => api.delete(`/users/${userId}`)
export const fetchTodos = () => api.get(`/todos`)
export const addTodo = (newTodo: Todo) => api.post(`/todos`, newTodo)
export const updateTodo = (todoID: number) => api.get(`/todos?todoId=${todoID}`)
export const deleteTodo = (todoId: number) => api.get(`/todos?todoId=${todoId}`)

export default api
