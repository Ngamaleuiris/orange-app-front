import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const NomadPage = () => {
  const navigate = useNavigate();

  const handleCreateUser = () => {
    navigate("/create-nomaduser/Nomad");
  };

  const handleModifyUser = () => {
    navigate("/modify-nomaduser/Nomad");
  };

  const handleDeleteUser = () => {
    navigate("/delete-user/Nomad");
  };

  const handleSuspendUser = () => {
    navigate("/suspend-user/Nomad");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <div className="flex flex-col items-center justify-center mt-12 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestion des Utilisateurs Nomad</h1>
        
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              className="bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition flex items-center justify-center"
              onClick={handleCreateUser}
            >
              <span className="text-lg">Créer un Utilisateur</span>
            </button>

            <button
              className="bg-blue-500 text-white p-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center"
              onClick={handleModifyUser}
            >
              <span className="text-lg">Modifier un Utilisateur</span>
            </button>

            <button
              className="bg-red-500 text-white p-4 rounded-lg hover:bg-red-600 transition flex items-center justify-center"
              onClick={handleDeleteUser}
            >
              <span className="text-lg">Supprimer un Utilisateur</span>
            </button>

            <button
              className="bg-yellow-500 text-white p-4 rounded-lg hover:bg-yellow-600 transition flex items-center justify-center"
              onClick={handleSuspendUser}
            >
              <span className="text-lg">Suspendre un Utilisateur</span>
            </button>
          </div>
        </div>

        <button
          className="mt-8 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          onClick={() => navigate("/dashboard")}
        >
          Retour au Dashboard
        </button>
      </div>
    </div>
  );
};

export default NomadPage; 