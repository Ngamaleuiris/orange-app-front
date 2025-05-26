import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import backgroundImage from '../assets/img-keycloak.png';

const DeleteUserKeycloak = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  
  // Couleurs Keycloak
  const keycloakOrange = 'rgb(240, 110, 0)';

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5254/api/users', {
        params: {
          type: 'keycloak'
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      setMessage({ 
        text: `Erreur lors de la récupération des utilisateurs: ${error.message}`,
        type: 'error'
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      setMessage({ 
        text: 'Veuillez sélectionner un utilisateur',
        type: 'error'
      });
      return;
    }

    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ? Cette action est irréversible.')) {
      return;
    }

    setLoading(true);
    try {
      await axios.delete(`http://localhost:5254/api/users/${selectedUser}`, {
        params: {
          type: 'keycloak'
        }
      });
      setMessage({ 
        text: 'Utilisateur supprimé avec succès',
        type: 'success'
      });
      fetchUsers(); // Rafraîchir la liste des utilisateurs
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      setMessage({ 
        text: `Erreur lors de la suppression de l'utilisateur: ${error.message}`,
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 relative overflow-hidden">
      {/* Motif de fond avec l'image Keycloak */}
      <div className="absolute inset-0 z-0">
        {/* Élément décoratif orange */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-bl-full transform rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/5 rounded-tr-full transform -rotate-12"></div>
        
        {/* Grande image centrale avec opacité réduite et léger teint orange */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
          <img src={backgroundImage} alt="Keycloak Logo" className="w-full h-full object-contain opacity-10 filter drop-shadow-[0_0_8px_rgba(240,110,0,0.3)]" />
        </div>
        
        {/* Images dans les coins */}
        <div className="absolute top-0 left-0 w-48 h-48">
          <img src={backgroundImage} alt="Keycloak" className="w-full h-full object-contain opacity-15" />
        </div>
        <div className="absolute top-0 right-0 w-48 h-48">
          <img src={backgroundImage} alt="Keycloak" className="w-full h-full object-contain opacity-15" />
        </div>
        <div className="absolute bottom-0 left-0 w-48 h-48">
          <img src={backgroundImage} alt="Keycloak" className="w-full h-full object-contain opacity-15" />
        </div>
        <div className="absolute bottom-0 right-0 w-48 h-48">
          <img src={backgroundImage} alt="Keycloak" className="w-full h-full object-contain opacity-15" />
        </div>
        
        {/* Motif répété subtil */}
        <div className="grid grid-cols-6 grid-rows-6 w-full h-full">
          {Array.from({ length: 36 }).map((_, index) => (
            <div key={index} className="flex items-center justify-center">
              <img 
                src={backgroundImage} 
                alt="" 
                className="w-12 h-12 object-contain opacity-5" 
              />
            </div>
          ))}
        </div>
      </div>

      <Header />
      <div className="container mx-auto px-4 py-16 relative z-10 flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="max-w-xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-10 border border-gray-200 border-t-4 border-t-orange-500">
          <h2 className="text-3xl font-bold mb-10 text-center">
            <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-transparent bg-clip-text">
              Supprimer un utilisateur Keycloak
            </span>
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-8 max-w-md mx-auto">
            <div className="mb-2">
              <label htmlFor="user" className="block text-gray-700 text-lg mb-3 font-medium flex items-center justify-center">
                <span className="inline-block w-2 h-6 bg-orange-500 mr-2 rounded-sm"></span>
                Sélectionner un utilisateur
              </label>
              <select
                id="user"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Sélectionner un utilisateur</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {message.text && (
              <div className={`p-4 rounded-lg text-center mb-2 ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-700' 
                  : 'bg-orange-50 border border-orange-200 text-orange-700'
              }`}>
                {message.text}
              </div>
            )}

            <div className="flex justify-center mt-8 space-x-6">
              <button
                type="button"
                onClick={() => navigate('/keycloak')}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300 flex items-center space-x-2 border border-gray-300 font-medium shadow-sm hover:shadow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span>Retour</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 shadow-md hover:shadow-lg font-medium"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Suppression...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>Supprimer</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserKeycloak;