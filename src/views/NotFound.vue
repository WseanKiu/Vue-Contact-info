<!-- src/views/NotFound.vue -->
<template>
  <div class="flex flex-col items-center justify-center h-screen text-center">
    <h1 class="text-4xl font-bold text-red-600">404</h1>
    <p class="text-xl text-gray-700">Page Not Found</p>
    <router-link to="/" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
      Go Back to Home
    </router-link>
  </div>
</template>

<script lang="ts" setup>
// No specific logic needed for this simple view
</script>

<style scoped>
/* Additional custom styling if needed */
</style>
