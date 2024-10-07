<template>
  <div class="w-full max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Crear Usuario</h1>
    <FormKit
      type="form"
      @submit="handleSubmit"
      :submit-attrs="{
        inputClass: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4',
        text: loading ? 'Creando...' : 'Crear Usuario',
        disabled: loading
      }"
    >
      <FormKit
        type="text"
        name="name"
        label="Nombre"
        validation="required"
        :validation-messages="{
          required: 'El nombre es requerido'
        }"
        v-model="user.name"
        placeholder="Ingrese el nombre del usuario"
      />
      <FormKit
        type="email"
        name="email"
        label="Email"
        validation="required|email"
        :validation-messages="{
          required: 'El email es requerido',
          email: 'Ingrese un email válido'
        }"
        v-model="user.email"
        placeholder="Ingrese el email del usuario"
      />
      <FormKit
        type="password"
        name="password"
        label="Contraseña"
        validation="required"
        :validation-messages="{
          required: 'La contraseña es requerida'
        }"
        v-model="user.password"
        placeholder="Ingrese la contraseña del usuario"
      />
      <FormKit
        type="password"
        name="password_confirmation"
        label="Confirmar Contraseña"
        validation="required|confirm:password"
        :validation-messages="{
          required: 'La confirmación de la contraseña es requerida',
          same: 'Las contraseñas no coinciden'
        }"
        v-model="user.password_confirmation"
        placeholder="Confirme la contraseña"
      />
      <FormKit
          type="select"
          name="roles"
          label="Rol"
          validation="required"
          :validation-messages="{
            required: 'El rol es requerido'
          }"
          v-model="selectedRole"
          :options="roleOptions"
          placeholder="Seleccione un rol"
      />
    </FormKit>
    <div class="text-center space-y-2">
      <router-link to="/users" class="font-medium text-gray-600 hover:text-gray-500">Volver a Usuarios</router-link>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../services/users';
import Swal from 'sweetalert2';

const router = useRouter();
const userStore = useUserStore();
const loading = ref(false);
const user = ref({ name: '', email: '', password: '', password_confirmation: '' });
const selectedRole = ref('');

const roleOptions = computed(() => {
  return userStore.roles.map(role => ({
    label: role.name.charAt(0).toUpperCase() + role.name.slice(1),
    value: role.name
  }));
});


onMounted(async () => {
  await userStore.getRoles();
});

const handleSubmit = async () => {
  loading.value = true;
  try {
    const userData = {
      ...user.value,
      roles: [selectedRole.value]
    };
    const response = await userStore.createUser(userData);
    await Swal.fire('¡Creado!', response.message, 'success');
    await router.push({ name: 'users' });
  } catch (error) {
    await Swal.fire('Error', error.response?.data.message || 'No se pudo crear el usuario.', 'error');
  } finally {
    loading.value = false;
  }
};
</script>