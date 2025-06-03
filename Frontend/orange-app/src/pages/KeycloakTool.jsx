import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const KeycloakTool = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    enabled: true
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5254/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des utilisateurs');
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // 'password', 'edit', 'delete'
  const [newPassword, setNewPassword] = useState('');
  const [editedUser, setEditedUser] = useState({});

  const openModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
    setNewPassword('');
    setEditedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const handlePasswordChange = async () => {
    try {
      const response = await fetch(`http://localhost:5254/api/users/${selectedUser.id}/reset-password`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          newPassword: newPassword
        }),
      });
  
      if (response.ok) {
        console.log("Mot de passe changé avec succès !");
        alert("Mot de passe changé avec succès !");
        closeModal();
      } else {
        const errorData = await response.json();
        console.error('Erreur lors du changement de mot de passe:', errorData);
        alert(`Erreur lors du changement de mot de passe: ${errorData.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert("Erreur réseau lors du changement de mot de passe.");
    }
  };
  
  const handleEditUser = async () => {
    try {
      const response = await fetch(`http://localhost:5254/api/users/${editedUser.id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: editedUser.username,
          email: editedUser.email,
          enabled: editedUser.enabled,
          firstName: editedUser.firstName || '',
          lastName: editedUser.lastName || ''
        }),
      });
  
      if (response.ok) {
        console.log("Utilisateur mis à jour !");
        alert("Utilisateur mis à jour !");
        setUsers(users.map(u => u.id === editedUser.id ? editedUser : u));
        closeModal();
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la mise à jour de l\'utilisateur:', errorData);
        alert(`Erreur lors de la mise à jour de l'utilisateur: ${errorData.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert("Erreur réseau lors de la mise à jour de l'utilisateur.");
    }
  };
  
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:5254/api/users/${selectedUser.id}`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
  
      if (response.ok) {
        console.log("Utilisateur supprimé avec succès !");
        alert("Utilisateur supprimé avec succès !");
        setUsers(users.filter(u => u.id !== selectedUser.id));
        closeModal();
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la suppression de l\'utilisateur:', errorData);
        alert(`Erreur lors de la suppression de l'utilisateur: ${errorData.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert("Erreur réseau lors de la suppression de l'utilisateur.");
    }
  };
  
  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://localhost:5254/api/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          enabled: newUser.enabled,
          credentials: [{
            type: "password",
            value: newUser.password,
            temporary: false
          }]
        }),
      });

      if (response.ok) {
        console.log("Utilisateur créé avec succès !");
        alert("Utilisateur créé avec succès !");
        setShowCreateModal(false);
        // Rafraîchir la liste des utilisateurs
        const fetchUsers = async () => {
          try {
            const response = await fetch('http://localhost:5254/api/users', {
              credentials: 'include'
            });
            if (!response.ok) {
              throw new Error('Erreur lors de la récupération des utilisateurs');
            }
            const data = await response.json();
            setUsers(data);
          } catch (err) {
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchUsers();
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la création de l\'utilisateur:', errorData);
        alert(`Erreur lors de la création de l'utilisateur: ${errorData.message || 'Erreur inconnue'}`);
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
      alert("Erreur réseau lors de la création de l'utilisateur.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      <Header />
      
      <div className="flex flex-col items-center justify-center mt-12 px-4">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">Keycloak Management Tool</h1>
        
        <div className="w-full max-w-6xl bg-white rounded-xl shadow-2xl p-8 border border-orange-100">
          {/* Contenu principal */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">Liste des Utilisateurs</h2>
                <button 
                  className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 shadow-md"
                  onClick={() => setShowCreateModal(true)}
                >
                  Nouvel Utilisateur
                </button>
              </div>
              {/* Tableau */}
              <div className="overflow-x-auto rounded-lg border border-orange-100">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr className="bg-orange-50">
                      <th className="py-3 px-4 border-b border-orange-100 text-left text-orange-800 font-semibold">N</th>
                      <th className="py-3 px-4 border-b border-orange-100 text-left text-orange-800 font-semibold">Identifiant</th>
                      <th className="py-3 px-4 border-b border-orange-100 text-left text-orange-800 font-semibold">Username</th>
                      <th className="py-3 px-4 border-b border-orange-100 text-left text-orange-800 font-semibold">Email</th>
                      <th className="py-3 px-4 border-b border-orange-100 text-left text-orange-800 font-semibold">Groups</th>
                      <th className="py-3 px-4 border-b border-orange-100 text-left text-orange-800 font-semibold">Enabled</th>
                      <th className="py-3 px-4 border-b border-orange-100 text-center text-orange-800 font-semibold">🔑</th>
                      <th className="py-3 px-4 border-b border-orange-100 text-center text-orange-800 font-semibold">✏️</th>
                      <th className="py-3 px-4 border-b border-orange-100 text-center text-orange-800 font-semibold">🗑️</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan="9" className="py-8 text-center text-gray-500">
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                            <span className="ml-3">Chargement en cours...</span>
                          </div>
                        </td>
                      </tr>
                    ) : error ? (
                      <tr>
                        <td colSpan="9" className="py-4 text-center text-red-500 bg-red-50">{error}</td>
                      </tr>
                    ) : (
                      users.map((user, index) => (
                        <tr key={user.id} className="hover:bg-orange-50 transition-colors duration-200">
                          <td className="py-3 px-4 border-b border-orange-100">{index + 1}</td>
                          <td className="py-3 px-4 border-b border-orange-100">{user.id}</td>
                          <td className="py-3 px-4 border-b border-orange-100">{user.username}</td>
                          <td className="py-3 px-4 border-b border-orange-100">{user.email}</td>
                          <td className="py-3 px-4 border-b border-orange-100">
                            {user.groups ? user.groups.join(', ') : 'Aucun groupe'}
                          </td>
                          <td className="py-3 px-4 border-b border-orange-100">
                            <span className={`px-2 py-1 rounded-full text-sm ${user.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {user.enabled ? 'Actif' : 'Inactif'}
                            </span>
                          </td>
                          <td className="py-3 px-4 border-b border-orange-100">
                            <button 
                              className="text-orange-500 hover:text-orange-700 transition-colors duration-200"
                              onClick={() => openModal(user, 'password')}
                            >
                              🔑
                            </button>
                          </td>
                          <td className="py-3 px-4 border-b border-orange-100">
                            <button 
                              className="text-orange-500 hover:text-orange-700 transition-colors duration-200"
                              onClick={() => openModal(user, 'edit')}
                            >
                              ✏️
                            </button>
                          </td>
                          <td className="py-3 px-4 border-b border-orange-100">
                            <button 
                              className="text-orange-500 hover:text-orange-700 transition-colors duration-200"
                              onClick={() => openModal(user, 'delete')}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <button
          className="mt-8 px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 shadow-md"
          onClick={() => navigate("/dashboard")}
        >
          Retour au Dashboard
        </button>
      </div>

      {/* Modals */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl space-y-4 max-w-md w-full border border-orange-100">
            <h2 className="text-2xl font-semibold text-orange-600">Créer un nouvel utilisateur</h2>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
              />
              
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              />
              
              <input
                type="text"
                placeholder="Prénom"
                className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={newUser.firstName}
                onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              />
              
              <input
                type="text"
                placeholder="Nom"
                className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={newUser.lastName}
                onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              />
              
              <input
                type="password"
                placeholder="Mot de passe"
                className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={newUser.password}
                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              />
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={newUser.enabled}
                  onChange={(e) => setNewUser({ ...newUser, enabled: e.target.checked })}
                  className="w-4 h-4 text-orange-500 border-orange-300 rounded focus:ring-orange-500"
                />
                <label className="text-gray-700">Actif</label>
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button 
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300"
                onClick={() => setShowCreateModal(false)}
              >
                Annuler
              </button>
              <button 
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
                onClick={handleCreateUser}
              >
                Créer
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl space-y-4 max-w-md w-full border border-orange-100">
            {modalType === 'password' && (
              <>
                <h2 className="text-2xl font-semibold text-orange-600">Changer le mot de passe</h2>
                <input
                  type="password"
                  placeholder="Nouveau mot de passe"
                  className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <div className="flex justify-end space-x-4 mt-6">
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300" onClick={closeModal}>Annuler</button>
                  <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300" onClick={handlePasswordChange}>Changer</button>
                </div>
              </>
            )}
            {modalType === 'edit' && (
              <>
                <h2 className="text-2xl font-semibold text-orange-600">Modifier l'utilisateur</h2>
                <input
                  type="text"
                  className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Nom d'utilisateur"
                  value={editedUser.username}
                  onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
                />
                <input
                  type="email"
                  className="w-full p-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Email"
                  value={editedUser.email}
                  onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={editedUser.enabled}
                    onChange={(e) => setEditedUser({ ...editedUser, enabled: e.target.checked })}
                    className="w-4 h-4 text-orange-500 border-orange-300 rounded focus:ring-orange-500"
                  />
                  <label className="text-gray-700">Actif</label>
                </div>
                <div className="flex justify-end space-x-4 mt-6">
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300" onClick={closeModal}>Annuler</button>
                  <button className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300" onClick={handleEditUser}>Enregistrer</button>
                </div>
              </>
            )}
            {modalType === 'delete' && (
              <>
                <h2 className="text-2xl font-semibold text-red-600">Supprimer l'utilisateur</h2>
                <p className="text-gray-700">Es-tu sûr de vouloir supprimer {selectedUser.username} ?</p>
                <div className="flex justify-end space-x-4 mt-6">
                  <button className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-300" onClick={closeModal}>Annuler</button>
                  <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300" onClick={handleDeleteUser}>Supprimer</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KeycloakTool;
