import React, { useState } from 'react';

const AddUserModal = ({ onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        "User Name": '',
        "Password": '',
        "Full Name": '',
        "Disable Account": false,
        "Type": '',
        "Country/Region code": '',
        "Mobile Number": '',
        "Email Address": ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Vérifier que tous les champs requis sont remplis
            const requiredFields = ["User Name", "Password", "Full Name", "Email Address"];
            const missingFields = requiredFields.filter(field => !formData[field]);
            
            if (missingFields.length > 0) {
                setError(`Veuillez remplir les champs obligatoires : ${missingFields.join(', ')}`);
                setLoading(false);
                return;
            }

            await onAdd(formData);
            setSuccess('Utilisateur ajouté avec succès');
            setTimeout(() => {
                onClose();
            }, 1500);
        } catch (error) {
            console.error('Erreur détaillée:', error);
            setError(error.response?.data?.message || 'Impossible d\'ajouter l\'utilisateur');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto">
            <div className="bg-white p-6 rounded-lg w-full max-w-2xl my-8">
                <h2 className="text-xl font-bold mb-4">Ajouter un nouvel utilisateur</h2>
                
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

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nom d'utilisateur *
                            </label>
                            <input
                                type="text"
                                name="User Name"
                                value={formData["User Name"]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Mot de passe *
                            </label>
                            <input
                                type="password"
                                name="Password"
                                value={formData["Password"]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Nom complet *
                            </label>
                            <input
                                type="text"
                                name="Full Name"
                                value={formData["Full Name"]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Type
                            </label>
                            <select
                                name="Type"
                                value={formData["Type"]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            >
                                <option value="">Sélectionner un type</option>
                                <option value="Admin">Administrateur</option>
                                <option value="User">Utilisateur</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Code pays/région
                            </label>
                            <input
                                type="text"
                                name="Country/Region code"
                                value={formData["Country/Region code"]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                placeholder="ex: +33"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Numéro de mobile
                            </label>
                            <input
                                type="tel"
                                name="Mobile Number"
                                value={formData["Mobile Number"]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Adresse email *
                            </label>
                            <input
                                type="email"
                                name="Email Address"
                                value={formData["Email Address"]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded-lg"
                                required
                            />
                        </div>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="Disable Account"
                                checked={formData["Disable Account"]}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <label className="text-gray-700 text-sm font-bold">
                                Désactiver le compte
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-6">
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
                            {loading ? 'Ajout en cours...' : 'Ajouter'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal; 