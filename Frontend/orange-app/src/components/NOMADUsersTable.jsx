import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaBan, FaPlus, FaKey } from 'react-icons/fa';

const NOMADUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState({
    nomadUserName: '',
    emailAddress: '',
    isSuspended: false
  });
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [passwordUser, setPasswordUser] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Charger les utilisateurs au chargement du composant
  useEffect(() => {
    fetchUsers();
  }, []);

  // Récupérer tous les utilisateurs
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5254/api/UserNOMADImport');
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError('Error loading NOMAD users');
      alert('Error loading users');
      console.error('Erreur de chargement:', err);
    } finally {
      setLoading(false);
    }
  };

  // Ouvrir le modal d'édition
  const openEditModal = (user) => {
    setEditingUser({...user});
    setShowEditModal(true);
  };

  // Fermer le modal d'édition
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
  };

  // Ouvrir le modal de création
  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  // Fermer le modal de création
  const closeCreateModal = () => {
    setShowCreateModal(false);
    setNewUser({
      nomadUserName: '',
      emailAddress: '',
      isSuspended: false
    });
  };

  // Ouvrir le modal de mot de passe
  const openPasswordModal = (user) => {
    setPasswordUser(user);
    setNewPassword('');
    setConfirmPassword('');
    setShowPasswordModal(true);
  };

  // Fermer le modal de mot de passe
  const closePasswordModal = () => {
    setShowPasswordModal(false);
    setPasswordUser(null);
    setNewPassword('');
    setConfirmPassword('');
  };

  // Gérer les changements dans le formulaire d'édition
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer les changements dans le formulaire de création
  const handleNewUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Gérer les changements de checkbox
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEditingUser(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Gérer les changements de checkbox pour le nouvel utilisateur
  const handleNewUserCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // Créer un utilisateur
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5254/api/UserNOMADImport', newUser);
      alert('User created successfully');
      fetchUsers(); // Recharger la liste après création
      closeCreateModal();
    } catch (err) {
      alert('Error creating user');
      console.error('Erreur de création:', err);
    }
  };

  // Modifier un utilisateur
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5254/api/UserNOMADImport/${editingUser.id}`, editingUser);
      alert('User updated successfully');
      fetchUsers(); // Recharger la liste après modification
      closeEditModal();
    } catch (err) {
      alert('Error updating user');
      console.error('Erreur de mise à jour:', err);
    }
  };

  // Suspendre un utilisateur
  const handleSuspend = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir suspendre cet utilisateur?')) {
      try {
        await axios.put(`http://localhost:5254/api/UserNOMADImport/${id}/suspend`);
        alert('User suspended successfully');
        fetchUsers(); // Recharger la liste après suspension
      } catch (err) {
        alert('Error suspending user');
        console.error('Erreur de suspension:', err);
      }
    }
  };

  // Supprimer un utilisateur
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur? Cette action est irréversible.')) {
      try {
        await axios.delete(`http://localhost:5254/api/UserNOMADImport/${id}`);
        alert('User deleted successfully');
        fetchUsers(); // Recharger la liste après suppression
      } catch (err) {
        alert('Error deleting user');
        console.error('Erreur de suppression:', err);
      }
    }
  };

  // Mettre à jour le mot de passe
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      await axios.put(`http://localhost:5254/api/UserNOMADImport/${passwordUser.id}/password`, {
        newPassword: newPassword
      });
      alert('Password updated successfully');
      closePasswordModal();
    } catch (err) {
      alert('Error updating password');
      console.error('Erreur de mise à jour du mot de passe:', err);
    }
  };

  if (loading) return <div className="text-center p-4">Loading users...</div>;
  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">NOMAD Users Management</h2>
        <button 
          onClick={openCreateModal}
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg flex items-center transition duration-200 ease-in-out transform hover:scale-105 shadow-md"
        >
          <FaPlus className="mr-2" /> Add User
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <tr>
            <th className="py-3 px-4 border-b text-left font-semibold">ID</th>
            <th className="py-3 px-4 border-b text-left font-semibold">Username</th>
            <th className="py-3 px-4 border-b text-left font-semibold">Email</th>
            <th className="py-3 px-4 border-b text-center font-semibold">Status</th>
            <th className="py-3 px-4 border-b text-center font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id} className="hover:bg-orange-50 transition duration-150 ease-in-out">
                <td className="py-3 px-4 text-left text-gray-700">{user.id}</td>
                <td className="py-3 px-4 text-left text-gray-700 font-medium">{user.nomadUserName}</td>
                <td className="py-3 px-4 text-left text-gray-700">{user.emailAddress}</td>
                <td className="py-3 px-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.isSuspended ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}`}>
                    {user.isSuspended ? 'Suspended' : 'Active'}
                  </span>
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => openEditModal(user)}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-110 shadow-sm"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => openPasswordModal(user)}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-110 shadow-sm"
                      title="Change Password"
                    >
                      <FaKey />
                    </button>
                    <button
                      onClick={() => handleSuspend(user.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-110 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Suspend"
                      disabled={user.isSuspended}
                    >
                      <FaBan />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition duration-200 ease-in-out transform hover:scale-110 shadow-sm"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="py-8 text-center text-gray-500">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit Modal */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Edit User</h3>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username:
                </label>
                <input
                  type="text"
                  name="nomadUserName"
                  value={editingUser.nomadUserName || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={editingUser.emailAddress || ''}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  name="isSuspended"
                  checked={editingUser.isSuspended || false}
                  onChange={handleCheckboxChange}
                  className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  id="isSuspended"
                />
                <label htmlFor="isSuspended" className="text-gray-700 text-sm font-bold">
                  Account Suspended
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Add User</h3>
            <form onSubmit={handleCreate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Username:
                </label>
                <input
                  type="text"
                  name="nomadUserName"
                  value={newUser.nomadUserName}
                  onChange={handleNewUserInputChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email:
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={newUser.emailAddress}
                  onChange={handleNewUserInputChange}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-6 flex items-center">
                <input
                  type="checkbox"
                  name="isSuspended"
                  checked={newUser.isSuspended}
                  onChange={handleNewUserCheckboxChange}
                  className="mr-2 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  id="newUserIsSuspended"
                />
                <label htmlFor="newUserIsSuspended" className="text-gray-700 text-sm font-bold">
                  Account Suspended
                </label>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeCreateModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Modal */}
      {showPasswordModal && passwordUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-2xl transform transition-all">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Change Password</h3>
            <p className="mb-6 text-gray-600">Changing password for user: <strong className="text-gray-800">{passwordUser.nomadUserName}</strong></p>
            <form onSubmit={handlePasswordUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  New Password:
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closePasswordModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NOMADUsersTable; 