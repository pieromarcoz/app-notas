<template>

  <div class="w-full max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Notas</h1>
    <div class="w-full flex justify-end">
      <router-link to="/notes/new" class="bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-lg px-4 py-2 inline-flex items-center mb-4">
        <Plus />
        <span class="ml-2">New note</span>
      </router-link>
    </div>
    <div class="relative overflow-x-auto">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead class="text-xs text-gray-700 uppercase bg-gray-100">
        <tr>
          <th scope="col" class="px-6 py-3">
            ID
          </th>
          <th scope="col" class="px-6 py-3">
            Title
          </th>
          <th scope="col" class="px-6 py-3">
            Content
          </th>
          <th scope="col" class="px-6 py-3">
            User
          </th>
          <th scope="col" class="px-6 py-3">
            Actions
          </th>
        </tr>
        </thead>
        <tbody>
        <tr class="bg-white border-b" v-for="(note, index) in notas" :key="note.id">
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
            {{ index + 1 }}
          </th>
          <td class="px-6 py-4">
            {{ note.title }}
          </td>
          <td class="px-6 py-4">
            {{ note.content }}
          </td>
          <td class="px-6 py-4">
            {{ note.user_name }}
          </td>
          <td class="px-6 py-4 flex gap-1 items-center [&>a>svg]:w-4 [&>svg]:h-4">
            <router-link :to="`/notes/${note.id}`">
              <Eye />
            </router-link>
            <router-link :to="`/notes/${note.id}/edit`">
              <Pencil />
            </router-link>
            <button @click="deleteNote(note.id)" >
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
import { Eye, Pencil, Trash2, Plus } from 'lucide-vue-next';
import { useNoteStore } from '../../services/notas';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const noteStore = useNoteStore();
const route = useRoute();

const fetchNotes = async () => {
  await noteStore.getNotes();
};

onMounted(fetchNotes);


const { notas } = noteStore;

const deleteNote = async (id) => {
  const result = await Swal.fire({
    title: "¿Estás seguro?",
    text: "¿Está seguro que quiere borrar esta nota?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, borrar",
    cancelButtonText: "Cancelar"
  });

  if (result.isConfirmed) {
    try {
      const response = await noteStore.deleteNote(id);
      if (response.success) {
        await Swal.fire({
          icon: 'success',
          title: '¡Eliminado!',
          text: response.message,
          timer: 1500,
          showConfirmButton: false
        });
        await fetchNotes();
      }
      await noteStore.getNotes();

    } catch (error) {
      if (error.response) {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data.message || 'No se pudo eliminar la nota. Inténtalo de nuevo.',
        });
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al conectar con el servidor.',
        });
      }
    }
  }
};
</script>