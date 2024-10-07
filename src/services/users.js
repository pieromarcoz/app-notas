import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from "../config/axios.js";

export const useUserStore = defineStore('users', () => {
  const users = ref([]);
  const roles = ref([]);

  async function getUsers() {
    try {
      const response = await axios.get('/users');
      users.value = response.data.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }

  async function getUser(userId) {
    try {
      const response = await axios.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }


  async function createUser(userData) {
    try {
      const response = await axios.post('/users', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async function updateUser(userId, userData) {
    try {
      const response = await axios.put(`/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async function deleteUser(userId) {
    try {
      await axios.delete(`/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async function getRoles() {
    try {
      const response = await axios.get('/roles');
      roles.value = response.data.data;
    } catch (error) {
      console.error('Error fetching roles:', error);
      throw error;
    }
  }


  return {
    users,
    roles,
    getRoles,
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
  };
});
