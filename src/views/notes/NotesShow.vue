<template>
  <div class="w-full max-w-7xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ note.title }}</h1>
    <p class="text-gray-700">{{ note.content }}</p>
    <div class="text-center space-y-2 mt-4">
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
import { useRoute } from 'vue-router';
import { useNoteStore } from '../../services/notas';

const route = useRoute();
const noteStore = useNoteStore();
const note = ref({ title: '', content: '' });

onMounted(async () => {
  const noteId = route.params.id; 
  const response = await noteStore.getNote(noteId);
  note.value = response.data; 
});
</script>