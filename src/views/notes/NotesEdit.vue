<template>
    <div class="w-full max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold mb-4">Editar Nota</h1>
        <FormKit
            type="form"
            @submit="handleSubmit"
            :submit-attrs="{
                inputClass: 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-4',
                text: loading ? 'Actualizando...' : 'Actualizar Nota',
                disabled: loading
            }"
        >
            <FormKit
                type="text"
                name="title"
                label="Título"
                validation="required"
                :validation-messages="{
                    required: 'El título es requerido'
                }"
                v-model="note.title"
                placeholder="Ingrese el título de la nota"
            />
            <FormKit
                type="textarea"
                name="content"
                label="Contenido"
                validation="required"
                :validation-messages="{
                    required: 'El contenido es requerido'
                }"
                v-model="note.content"
                placeholder="Ingrese el contenido de la nota"
            />
        </FormKit>
        <div class="text-center space-y-2">
            <router-link 
                to="/notes" 
                class="font-medium text-gray-600 hover:text-gray-500"
            >
                Volver a Notas
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNoteStore } from '../../services/notas';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();
const noteStore = useNoteStore();
const loading = ref(false);
const note = ref({ title: '', content: '' });

onMounted(async () => {
    const noteId = route.params.id;
    const response = await noteStore.getNote(noteId);
    note.value = response.data;
});

const handleSubmit = async () => {
    loading.value = true;
    try {
        const noteId = route.params.id;
        const response = await noteStore.updateNote(noteId, note.value);
        await Swal.fire({
            icon: 'success',
            title: '¡Actualizado!',
            text: response.message,
            timer: 1500,
            showConfirmButton: false
        });
        await router.push({ name: 'notes' });
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response?.data.message || 'No se pudo actualizar la nota. Inténtalo de nuevo.',
        });
    } finally {
        loading.value = false;
    }
};
</script>