import { defineStore } from 'pinia'
import { fetchTodos } from '@/services/api'
import type { Todo } from '@/types/Todo'

export const useTodoStore = defineStore('todoStore', {
  state: () => ({
    lastTodoID: 200,
    todos: [] as Todo[],
    loading: false,
  }),
  actions: {
    async loadTodos() {
      const response = await fetchTodos()
      this.todos = response.data
    },
    async addTodo(newTodo: Todo) {
      this.todos.push({ ...newTodo, id: this.lastTodoID + 1 })
      this.lastTodoID = this.lastTodoID + 1
    },
    async editTodo(todoId: number, updatedTodo: Todo) {
      const index = this.todos.findIndex((todo) => todo.id === todoId)
      if (index !== -1) this.todos[index] = updatedTodo
    },
    async removetodo(todoId: number) {
      this.todos = this.todos.filter((todo) => todo.id !== todoId)
    },
    toggleTodo(id: number) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
  },
  getters: {
    getTodosByUserId: (state) => (userId: number) => {
      return state.todos.filter((todo) => todo.userId === userId)
    },
  },
})
