import axios from 'axios';

const API_URL = 'http://localhost:5254/api/users'; // Port modifié à 5254

const userService = {
    // Récupérer tous les utilisateurs
    getAllUsers: async () => {
        try {
            const response = await axios.get(API_URL);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la récupération des utilisateurs:', error);
            throw error;
        }
    },

    // Mettre à jour un utilisateur
    updateUser: async (userId, userData) => {
        try {
            const response = await axios.put(`${API_URL}/${userId}`, userData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur:', error);
            throw error;
        }
    },

    // Désactiver un utilisateur
    disableUser: async (userId) => {
        try {
            const response = await axios.put(`${API_URL}/${userId}/disable`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la désactivation de l\'utilisateur:', error);
            throw error;
        }
    },

    // Supprimer un utilisateur
    deleteUser: async (userId) => {
        try {
            const response = await axios.delete(`${API_URL}/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            throw error;
        }
    },

    // Réinitialiser le mot de passe
    resetPassword: async (userId, passwordData) => {
        try {
            const response = await axios.post(`${API_URL}/${userId}/reset-password`, passwordData);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réinitialisation du mot de passe:', error);
            throw error;
        }
    }
};

export default userService; 