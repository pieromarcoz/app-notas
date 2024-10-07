import {defineStore} from 'pinia'
import {ref} from 'vue'
import axios from "../config/axios.js";

export const useNoteStore = defineStore('notas', () => {
    const notas = ref([])

    async function getNotes() {
        try {
            const response = await axios.get('/notas')
            notas.value = response.data.data
        } catch (error) {
            console.error('Error fetching notas:', error)
            throw error
        }
    }

    async function getNote(id) {
        try {
            const response = await axios.get(`/notas/${id}`)
            return response.data
        } catch (error) {
            console.error('Error fetching nota:', error)
            throw error
        }
    }

    async function createNote(noteData) {
        try {
            const response = await axios.post('/notas', noteData)
            return response.data
        } catch (error) {
            console.error('Error creating note:', error)
            throw error
        }
    }

    async function updateNote(noteId, noteData) {
        try {
            const response = await axios.put(`/notas/${noteId}`, noteData)
            return response.data
        } catch (error) {
            console.error('Error updating note:', error)
            throw error
        }
    }

    async function deleteNote(noteId) {
        try {
            const response = await axios.delete(`/notas/${noteId}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting note:', error)
            throw error
        }
    }

    return {
        notas,
        getNotes,
        getNote,
        createNote,
        updateNote,
        deleteNote
    }
})
