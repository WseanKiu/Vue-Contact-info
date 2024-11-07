<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 shadow-md">
      <h1 class="text-2xl font-bold text-center">User Management App</h1>
    </header>

    <!-- Main Content -->
    <main class="p-6">
      <!-- Router View: Displays the current route's component -->
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
// No additional setup is needed for the basic layout
</script>

<style>
/* Basic global styling */
body {
  margin: 0;
}
</style>
