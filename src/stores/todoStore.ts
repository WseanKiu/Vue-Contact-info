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
    // async loadTodosByUserId(userId: number) {
    //   try {
    //     // const response = await fetchUserTodos(userId);
    //     // this.todos = response.data;
    //   } catch (error) {
    //     console.error('Error loading todos:', error);
    //   }
    // },
    async addTodo(newTodo: Todo) {
      // await fetchTodos(newTodo)
      this.todos.push({ ...newTodo, id: this.lastTodoID + 1 })
      this.lastTodoID = this.lastTodoID + 1
    },
    async edittodo(todoId: number, updatedTodo: Todo) {
      // if (todoId <= 200) await updateTodo(todoId, updatedTodo) // avoid unsupported id on jsonplaceholder
      const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id)
      if (index !== -1) this.todos[index] = updatedTodo
    },
    async removetodo(todoId: number) {
      // await deletetodo(todoId)
      this.todos = this.todos.filter((todo) => todo.id !== todoId)
      // await this.loadUsers() for real server behavior
    }, // Toggle the completion status of a todo by id
    toggleTodo(id: number) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) {
        // Directly mutate the todo's `completed` property
        todo.completed = !todo.completed
      }
      // const index = this.todos.findIndex((t) => t.id === id)
      // // const todo = this.todos.find((t) => t.id === id)
      // const td = this.todos[index]
      // if (td) {
      //   // Toggle the completed status locally
      //   td.completed = !td.completed
      // }

      // console.log('todo', td)

      // if (index !== -1) this.todos[index] = td
    },
  },
  getters: {
    // Getter to filter todos by user ID
    getTodosByUserId: (state) => (userId: number) => {
      return state.todos.filter((todo) => todo.userId === userId)
    },
  },
})
