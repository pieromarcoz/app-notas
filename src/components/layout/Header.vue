<template>
  <header class="bg-white shadow">
    <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
      <button
        @click="$emit('logout')"
        class="px-4 py-2 font-semibold text-sm bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  </header>
</template>

<script setup>

</script>
