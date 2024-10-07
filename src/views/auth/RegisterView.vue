<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Crear una cuenta
                </h2>
            </div>
            
            <!-- Mensaje de error general -->
            <div v-if="errorMessage" class="bg-red-50 p-4 rounded-md">
                <div class="flex">
                    <div class="flex-shrink-0">
                    </div>
                    <div class="ml-3">
                        <h3 class="text-sm font-medium text-red-800">
                            {{ errorMessage }}
                        </h3>
                    </div>
                </div>
            </div>

            <FormKit
                type="form"
                @submit="handleSubmit"
                :submit-attrs="{
                    inputClass: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4',
                    text: loading ? 'Registrando...' : 'Registrarse',
                    disabled: loading
                }"
            >
                <FormKit
                    type="text"
                    name="name"
                    label="Nombre completo"
                    validation="required"
                    :validation-messages="{
                        required: 'El nombre es requerido'
                    }"
                    :errors="backendErrors"
                    placeholder="Ingrese su nombre completo"
                />
                <FormKit
                    type="email"
                    name="email"
                    label="Correo electrónico"
                    validation="required|email"
                    :validation-messages="{
                        required: 'El correo electrónico es requerido',
                        email: 'Ingrese un correo electrónico válido'
                    }"
                    :errors="backendErrors"
                    placeholder="correo@ejemplo.com"
                />
                <FormKit
                    type="password"
                    name="password"
                    label="Contraseña"
                    validation="required|length:8"
                    :validation-messages="{
                        required: 'La contraseña es requerida',
                        length: 'La contraseña debe tener al menos 8 caracteres'
                    }"
                    :errors="backendErrors"
                    placeholder="Ingrese su contraseña"
                />
                <FormKit
                    type="password"
                    name="password_confirmation"
                    label="Confirmar contraseña"
                    validation="required|confirm:password"
                    :validation-messages="{
                        required: 'La confirmación de contraseña es requerida',
                        confirm: 'Las contraseñas no coinciden'
                    }"
                    :errors="backendErrors"
                    placeholder="Confirme su contraseña"
                />
            </FormKit>
            <div class="text-center space-y-2">
                <router-link 
                    to="/login" 
                    class="font-medium text-gray-600 hover:text-gray-500"
                >
                    ¿Ya tienes una cuenta? Inicia sesión
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../services/auth';
import Swal from 'sweetalert2';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);
const errorMessage = ref('');
const backendErrors = ref([]);

const handleSubmit = async (formData) => {
    loading.value = true;
    errorMessage.value = '';
    backendErrors.value = [];

    try {
        const response = await authStore.register(formData);
        
        if (response.success) {
            await Swal.fire({
                icon: 'success',
                title: '¡Registro exitoso!',
                text: response.message,
                timer: 1500,
                showConfirmButton: false
            });
            await router.push({ name: 'dashboard' });
        }
    } catch (error) {
        console.error('Error al registrarse:', error);
        
        if (error.response?.data) {
            const { success, message, errors } = error.response.data;
            
            if (!success && errors) {
                backendErrors.value = Array.isArray(errors) ? errors : [errors];
                errorMessage.value = message || 'Error al registrarse';
            }
        } else {
            errorMessage.value = 'Error al conectar con el servidor';
        }

        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: errorMessage.value
        });
    } finally {
        loading.value = false;
    }
};
</script>