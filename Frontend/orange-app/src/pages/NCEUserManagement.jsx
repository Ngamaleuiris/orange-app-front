// src/pages/NCEUserManagement.jsx
import React, { useState } from 'react';
import UsersTable from '../components/UsersTable';
import AddUserModal from '../components/AddUserModal';

/**
 * Page de gestion des utilisateurs pour l'outil NCE
 * Affiche un tableau interactif des utilisateurs avec des fonctionnalités de gestion
 */
const NCEUserManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddUser = async (userData) => {
    try {
      // Implémenter la logique d'ajout d'utilisateur
      console.log('Ajout d\'un nouvel utilisateur:', userData);
      setShowAddModal(false);
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* En-tête de la page */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Gestion des Utilisateurs NCE</h1>
        <p className="text-gray-600 mt-2">
          Administrez les accès et permissions des utilisateurs de la plateforme NCE
        </p>
      </header>

      {/* Section principale avec le tableau des utilisateurs */}
      <main className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Liste des Utilisateurs</h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
          >
            Ajouter un utilisateur
          </button>
        </div>
        
        {/* Composant de tableau des utilisateurs */}
        <UsersTable tool="NCE" />
      </main>

      {/* Pied de page optionnel */}
      <footer className="mt-8 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Plateforme NCE - Tous droits réservés
      </footer>

      {/* Modale d'ajout d'utilisateur */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddUser}
          tool="NCE"
        />
      )}
    </div>
  );
};

export default NCEUserManagement;