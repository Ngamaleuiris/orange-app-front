import axios from 'axios';
import mockApi from '../mockApi';

const API_URL = 'http://localhost:3000/api';
const USE_MOCK_API = true; // Mettre à false pour utiliser l'API réelle

const authService = {
  login: async (cuid, password) => {
    console.log("Service d'authentification - Tentative de connexion:", { cuid, password });
    
    if (USE_MOCK_API) {
      const response = await mockApi.login(cuid, password);
      console.log("Réponse du mock API:", response);
      return response;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        cuid,
        password
      });
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data;
      }
      throw new Error('Token non reçu');
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  },

  register: async (userData) => {
    console.log("Service d'authentification - Tentative d'inscription:", userData);
    
    if (USE_MOCK_API) {
      const response = await mockApi.register(userData);
      console.log("Réponse du mock API:", response);
      return response;
    }

    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  getUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default authService; 