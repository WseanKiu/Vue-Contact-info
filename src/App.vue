<template>
  <div id="app" class="min-h-screen bg-gray-100">
    <!-- Header -->
    <header class="bg-gray-900 text-white p-4 shadow-md">
      <router-link to="/" class="text-2xl font-bold text-left block hover:underline">
        <div class="flex items-center">
          <div class="pr-2">
            <logo />
          </div>
          <h2 class="text-2xl font-bold text-left">User Management App</h2>
        </div>
      </router-link>
    </header>

    <!-- Main Content -->
    <main class="p-6">
      <router-view />
    </main>
  </div>
</template>

<script lang="ts" setup>
import logo from '@/components/icons/IconTooling.vue'
</script>

<style>
body {
  margin: 0;
}
</style>
