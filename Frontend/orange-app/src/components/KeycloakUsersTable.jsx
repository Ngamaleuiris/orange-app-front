import React, { useState, useEffect } from 'react';
import { FaKey, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';

const KeycloakUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('api/users');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      // Implémenter la logique de mise à jour
      console.log('Mise à jour de l\'utilisateur:', userId);
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        const response = await fetch(`api/users/${userId}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          setUsers(users.filter(user => user.id !== userId));
        } else {
          throw new Error('Erreur lors de la suppression');
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    }
  };

  const handlePasswordReset = async (userId) => {
    try {
      // Implémenter la logique de réinitialisation du mot de passe
      console.log('Réinitialisation du mot de passe pour:', userId);
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="text-red-500 p-4 text-center">
      Erreur: {error}
    </div>
  );

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">N°</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Identifiant</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Username</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Email</th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Groups</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Enabled</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Password</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Modifier</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-600">Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{user.id}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{user.username}</td>
              <td className="px-4 py-3 text-sm text-gray-600">{user.email}</td>
              <td className="px-4 py-3 text-sm text-gray-600">
                {user.groups?.join(', ') || '-'}
              </td>
              <td className="px-4 py-3 text-center">
                {user.enabled ? (
                  <FaCheck className="inline text-green-500" />
                ) : (
                  <FaTimes className="inline text-red-500" />
                )}
              </td>
              <td className="px-4 py-3 text-center">
                <button 
                  onClick={() => handlePasswordReset(user.id)}
                  className="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <FaKey />
                </button>
              </td>
              <td className="px-4 py-3 text-center">
                <button 
                  onClick={() => handleUpdateUser(user.id)}
                  className="text-yellow-500 hover:text-yellow-700 transition-colors"
                >
                  <FaEdit />
                </button>
              </td>
              <td className="px-4 py-3 text-center">
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KeycloakUsersTable;
