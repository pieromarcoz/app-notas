<template>
    <div class="flex h-screen bg-gray-100">
        <Sidebar />
        <div class="flex-1 flex flex-col overflow-hidden">
            <Header @logout="handleLogout" />
            <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../services/auth';
import Sidebar from './Sidebar.vue';
import Header from './Header.vue';

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
    await authStore.logout();
    router.push('/login');
};
</script>