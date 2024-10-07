import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from "../config/axios.js";

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const token = ref(localStorage.getItem('token') || null)

    const isAuthenticated = computed(() => !!token.value)
    const isAdmin = computed(() => user.value?.role === 'admin')
    const isStandar = computed(() => user.value?.role === 'estandar')
    const isViewer = computed(() => user.value?.role === 'viewer')

    function setAuthHeader() {
        if (token.value) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    async function login(credentials) {
        try {
            const response = await axios.post('/login', credentials);
            token.value = response.data.data.token.token;
            user.value = { role: response.data.data.role }; 
            localStorage.setItem('token', token.value);
            localStorage.setItem('user', JSON.stringify(user.value)); 
            setAuthHeader();
            return response.data
        } catch (error) {
            throw error
        }
    }

    async function register(userData) {
        try {
            const response = await axios.post('/register', userData)
            token.value = response.data.data.token.token
            user.value = { role: response.data.data.role };
            localStorage.setItem('token', response.data.data.token)
            localStorage.setItem('user', JSON.stringify(user.value))
            setAuthHeader()
            return response.data
        } catch (error) {
            throw error
        }
    }

    async function logout() {
        try {
            await axios.post('/logout')
        } finally {
            user.value = null
            token.value = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            setAuthHeader()
        }
    }

    // Llamar a setAuthHeader al inicializar el store
    setAuthHeader()

    return {
        user,
        token,
        isAuthenticated,
        isStandar,
        isAdmin,
        isViewer,
        login,
        register,
        logout
    }
})