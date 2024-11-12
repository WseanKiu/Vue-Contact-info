<template>
  <div v-if="user">
    <h1 class="text-2xl font-semibold mb-4">{{ user.name }}'s Details</h1>
    <p><strong>Email:</strong> {{ user.email }}</p>
    <p><strong>Phone:</strong> {{ user.phone }}</p>

    <h2 class="text-xl font-semibold mt-6 mb-2">Todos</h2>
    <!-- Add Todo Form -->
    <div class="mb-4">
      <input
        v-model="newTodoTitle"
        type="text"
        class="p-2 border border-gray-300 rounded-md"
        placeholder="Add a new todo"
      />
      <button
        @click="addNewTodo"
        class="ml-2 p-2 bg-blue-500 text-white rounded-md"
        :disabled="!newTodoTitle"
      >
        Add Todo
      </button>
    </div>

    <ul v-if="userTodos && userTodos.length > 0">
      <li v-for="todo in userTodos" :key="todo.id" class="flex items-center space-x-2">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodoCompletion(todo.id)"
          class="mr-2"
        />
        <span :class="{ 'line-through': todo.completed }">{{ todo.title }}</span>
      </li>
    </ul>
    <p v-else>No todos available.</p>
  </div>
  <p v-else>Loading user details...</p>

  <div class="fixed bottom-4 right-4">
    <router-link
      to="/"
      class="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
    >
      Go back
    </router-link>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useTodoStore } from '@/stores/todoStore'
import type { Todo } from '@/types/Todo'
import type { User } from '@/types/User'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const todoStore = useTodoStore()

const userId = parseInt(route.params.id as string, 10)
const user = ref<User | null>(null)
const newTodoTitle = ref('')

onMounted(async () => {
  // Ensure users are loaded before accessing user data
  if (userStore.users.length === 0) {
    await userStore.loadUsers()
  }
  if (todoStore.todos.length === 0) {
    await todoStore.loadTodos()
  }

  // Find the user after ensuring data is loaded
  user.value = userStore.users.find((u) => u.id === userId) || null

  if (!user.value) {
    console.warn('User not found')
    return router.push({ name: 'NotFound' })
  }
})

const addNewTodo = () => {
  if (newTodoTitle.value.trim()) {
    const newTodo: Todo = {
      userId: userId,
      id: todoStore.lastTodoID + 1,
      title: newTodoTitle.value,
      completed: false,
    }
    todoStore.addTodo(newTodo)

    // Reset input field
    newTodoTitle.value = ''
  }
}

// Function to toggle todo completion
const toggleTodoCompletion = (todoId: number) => {
  todoStore.toggleTodo(todoId)
}

const userTodos = computed(() => todoStore.getTodosByUserId(userId))
</script>
