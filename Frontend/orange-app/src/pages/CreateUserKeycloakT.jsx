import React, { useState, useEffect } from 'react';
import { createUser, getUsers } from '../services/KeycloakApi';

const CreateUserKeycloak = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const fetchUsers = async () => {
    try {
      const userList = await getUsers();
      setUsers(userList);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await createUser({
        username: formData.username,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        enabled: true,
        credentials: [
          {
            type: 'password',
            value: formData.password,
            temporary: false
          }
        ]
      });
      setMessage('Utilisateur créé avec succès 🎉');
      setFormData({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: ''
      });
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error(error.message);
      setMessage(`Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Créer un nouvel utilisateur Keycloak</h1>

      {message && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nom d'utilisateur"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="Prénom"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          placeholder="Nom de famille"
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Création...' : 'Créer Utilisateur'}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Liste des utilisateurs</h2>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="border p-2 rounded">
              {user.username} - {user.firstName} {user.lastName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CreateUserKeycloak;
