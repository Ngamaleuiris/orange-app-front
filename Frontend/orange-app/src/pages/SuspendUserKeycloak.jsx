import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import backgroundImage from '../assets/img-keycloak.png';

const SuspendUserKeycloak = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5254/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      setMessage(`Erreur lors de la récupération des utilisateurs: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedUser) {
      setMessage('Veuillez sélectionner un utilisateur');
      return;
    }

    setLoading(true);
    try {
      await axios.put(`http://localhost:5254/api/users/${selectedUser}/disable`);
      setMessage('Utilisateur suspendu avec succès');
      fetchUsers(); // Rafraîchir la liste des utilisateurs
    } catch (error) {
      console.error('Erreur lors de la suspension de l\'utilisateur:', error);
      setMessage(`Erreur lors de la suspension de l'utilisateur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        {/* Partie gauche avec le formulaire */}
        <div className="w-3/4 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold text-black-600 mb-6">Suspendre un utilisateur Keycloak</h1>
          
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Sélectionner un utilisateur</label>
              <select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">-- Sélectionner un utilisateur --</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.username} ({user.email})
                  </option>
                ))}
              </select>
            </div>

            {message && (
              <div className={`mb-4 p-3 rounded ${
                message.includes('succès') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? 'Suspension en cours...' : 'Suspendre l\'utilisateur'}
            </button>
          </form>

          <button
            onClick={() => navigate(-1)}
            className="mt-4 text-orange-500 hover:text-orange-600"
          >
            Retour
          </button>
        </div>

        {/* Partie droite avec l'image */}
        <div className="w-1/4 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "80%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
          }}
        />
      </div>
    </div>
  );
};

export default SuspendUserKeycloak; 