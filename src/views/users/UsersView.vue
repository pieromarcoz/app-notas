<template>
  <div class="w-full max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Usuarios</h1>
    <div class="w-full flex justify-end">
      <router-link to="/users/new"
                   class="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg px-4 py-2 inline-flex items-center mb-4">
        <Plus/>
        <span class="ml-2">Nuevo Usuario</span>
      </router-link>
    </div>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" class="px-6 py-3">ID</th>
          <th scope="col" class="px-6 py-3">Nombre</th>
          <th scope="col" class="px-6 py-3">Email</th>
          <th scope="col" class="px-6 py-3">Roles</th>
          <th scope="col" class="px-6 py-3">Acciones</th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-white border-b" v-for="(user, index) in users" :key="user.id">
          <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">{{ index + 1 }}</td>
          <td class="px-6 py-4">{{ user.name }}</td>
          <td class="px-6 py-4">{{ user.email }}</td>
          <td class="px-6 py-4">{{ user.roles.map(role => role.name).join(', ') }}</td>
          <td class="px-6 py-4 flex gap-1 items-center [&>a>svg]:w-4 [&>svg]:h-4">
            <router-link :to="`/users/${user.id}`">
              <Eye/>
            </router-link>
            <router-link :to="`/users/${user.id}/edit`">
              <Pencil/>
            </router-link>
            <button @click="deleteUser(user.id)">
              <Trash2 class="w-4 h-4"/>
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {useUserStore} from '../../services/users';
import Swal from 'sweetalert2';

const userStore = useUserStore();
import {Eye, Pencil, Trash2, Plus} from 'lucide-vue-next';

onMounted(async () => {
  await userStore.getUsers();
});
const {users} = userStore;

const deleteUser = async (id) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta seguro que quieres borrar este usuario?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "Cancelar"
  });

  if (result.isConfirmed) {
    try {
      await userStore.deleteUser(id);
      await Swal.fire('¡Eliminado!', 'Usuario eliminado correctamente.', 'success');
      await userStore.getUsers();
    } catch (error) {
      await Swal.fire('Error', 'No se pudo eliminar el usuario.', 'error');
    }
  }
};
</script>