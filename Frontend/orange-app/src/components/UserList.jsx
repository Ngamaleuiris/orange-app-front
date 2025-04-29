import React, { useState, useEffect } from 'react';
import { getUsers, updateUser } from '../services/KeycloakApi';
import EditUserModal from './EditUserModal';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            setError('Erreur lors de la récupération des utilisateurs');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const handleUpdate = async (userId, userData) => {
        try {
            await updateUser(userId, userData);
            fetchUsers(); // Rafraîchir la liste après la mise à jour
        } catch (error) {
            console.error('Erreur lors de la mise à jour:', error);
        }
    };

    if (loading) {
        return <div className="p-4">Chargement...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-600">{error}</div>;
    }

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Liste des utilisateurs Keycloak</h2>
            
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nom d'utilisateur
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Prénom
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Nom
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Statut
                            </th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {user.username}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {user.firstName}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {user.lastName}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    {user.enabled ? 'Actif' : 'Inactif'}
                                </td>
                                <td className="px-6 py-4 border-b border-gray-300">
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="text-orange-600 hover:text-orange-800 mr-2"
                                    >
                                        Modifier
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    onClose={handleCloseModal}
                    onUpdate={() => handleUpdate(selectedUser.id, selectedUser)}
                />
            )}
        </div>
    );
};

export default UserList; 