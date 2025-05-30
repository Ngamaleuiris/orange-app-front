import React, { useState } from 'react';

const EditUserModal = ({ user, onClose, onUpdate, allUsers }) => {
    const [formData, setFormData] = useState({
        role: user["Role"] || ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    // Extraire les rôles uniques de tous les utilisateurs
    const roles = [...new Set(allUsers.map(user => user["Role"]))].filter(Boolean);

    const handleChange = (e) => {
        const { value } = e.target;
        setFormData({ role: value });
        // Réinitialiser les messages d'erreur/succès lors d'un changement
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Vérifier que le rôle a été sélectionné
            if (!formData.role) {
                setError('Veuillez sélectionner un rôle');
                setLoading(false);
                return;
            }

            // Vérifier que le rôle est différent du rôle actuel
            if (formData.role === user["Role"]) {
                setError('Le nouveau rôle doit être différent du rôle actuel');
                setLoading(false);
                return;
            }

            await onUpdate(user.id, formData);
            setSuccess('Rôle modifié avec succès');
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error('Erreur détaillée:', error);
            setError(error.response?.data?.message || 'Impossible de modifier le rôle');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Modifier le rôle de l'utilisateur</h2>
                <p className="mb-4 text-gray-600">Utilisateur : {user["User Name"]}</p>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Rôle actuel : {user["Role"]}
                        </label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded-lg bg-white"
                            required
                        >
                            <option value="">Sélectionner un nouveau rôle</option>
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
                        >
                            {loading ? 'Modification...' : 'Modifier'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal; 