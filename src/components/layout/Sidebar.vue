<template>
  <aside class="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
    <nav>
      <router-link
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        :class="{ 'bg-gray-700': $route.path === item.path }"
      >
        {{ item.name }}
      </router-link>
    </nav>
  </aside>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../services/auth';

const authStore = useAuthStore();

const menuItems = ref([
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Notas', path: '/notes' },
]);
if (authStore.isAdmin) {
  menuItems.value.push({ name: 'Gestión de Usuarios', path: '/users' });
}
</script>
