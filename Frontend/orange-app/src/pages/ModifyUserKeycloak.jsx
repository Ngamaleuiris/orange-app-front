import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
import backgroundImage from "../assets/img-keycloak.png";

const ModifyUserKeycloak = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5254/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs:", error);
      setError("Erreur lors de la récupération des utilisateurs");
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z]+\.[a-zA-Z]+@orange\.com$/;
    return regex.test(email);
  };

  const handleUserSelect = (user) => {
    setSelectedUser({
      id: user.id,
      username: user.username,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      enabled: user.enabled
    });
    setEmailError("");
    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateEmail(selectedUser.email)) {
      setEmailError("L'email doit être au format: prenom.nom@orange.com");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5254/api/users/${selectedUser.id}`,
        {
          firstName: selectedUser.firstName,
          lastName: selectedUser.lastName,
          email: selectedUser.email,
          enabled: selectedUser.enabled
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Utilisateur modifié avec succès");
        fetchUsers(); // Rafraîchir la liste des utilisateurs
      }
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      setError(`Erreur lors de la modification: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 relative overflow-hidden">
      <Header />
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Modifier un utilisateur Keycloak</h1>
            <button
              onClick={() => navigate(-1)}  // Modification ici pour utiliser l'historique de navigation
              className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
            >
              Retour
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Liste des utilisateurs */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">Liste des utilisateurs</h2>
              {loading ? (
                <p className="text-gray-600">Chargement des utilisateurs...</p>
              ) : error ? (
                <p className="text-red-600">{error}</p>
              ) : (
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {users.map((user) => (
                    <div
                      key={user.id}
                      onClick={() => handleUserSelect(user)}
                      className={`p-4 rounded-lg cursor-pointer transition-colors ${
                        selectedUser?.id === user.id
                          ? "bg-orange-100 border-2 border-orange-500"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="font-medium text-gray-800">{user.username}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-sm text-gray-500">
                        {user.firstName} {user.lastName}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Formulaire de modification */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              {selectedUser ? (
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-semibold text-gray-700 mb-6">Modifier l'utilisateur</h2>
                  
                  {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                      {successMessage}
                    </div>
                  )}
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Nom d'utilisateur</label>
                    <input
                      type="text"
                      value={selectedUser.username}
                      disabled
                      className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-md cursor-not-allowed"
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Prénom</label>
                    <input
                      type="text"
                      value={selectedUser.firstName}
                      onChange={(e) => setSelectedUser({ ...selectedUser, firstName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Nom</label>
                    <input
                      type="text"
                      value={selectedUser.lastName}
                      onChange={(e) => setSelectedUser({ ...selectedUser, lastName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2">E-mail</label>
                    <input
                      type="email"
                      value={selectedUser.email}
                      onChange={(e) => {
                        setSelectedUser({ ...selectedUser, email: e.target.value });
                        setEmailError(
                          !validateEmail(e.target.value) 
                            ? "L'email doit être au format: prenom.nom@orange.com" 
                            : ""
                        );
                      }}
                      className={`w-full px-4 py-2 border ${
                        emailError ? 'border-red-500' : 'border-gray-300'
                      } rounded-md focus:outline-none focus:ring-2 ${
                        emailError ? 'focus:ring-red-500' : 'focus:ring-orange-500'
                      } focus:border-transparent`}
                      placeholder="prenom.nom@orange.com"
                      required
                    />
                    {emailError && <p className="mt-1 text-sm text-red-600">{emailError}</p>}
                  </div>

                  <div className="mb-6 flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedUser.enabled}
                      onChange={(e) => setSelectedUser({ ...selectedUser, enabled: e.target.checked })}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      id="enabled-checkbox"
                    />
                    <label htmlFor="enabled-checkbox" className="ml-2 block text-gray-600 text-sm">
                      Activer l'utilisateur
                    </label>
                  </div>

                  <div className="flex justify-end space-x-4">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    >
                      Enregistrer
                    </button>
                  </div>
                </form>
              ) : (
                <div className="text-center text-gray-600 py-8">
                  Sélectionnez un utilisateur dans la liste pour le modifier
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Image de fond */}
      <div className="absolute inset-0 z-0 opacity-5">
        <img
          src={backgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default ModifyUserKeycloak;