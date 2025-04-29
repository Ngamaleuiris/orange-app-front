import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Assurez-vous que le chemin est correct
import backgroundImage from "../assets/img-nce.png"; // Import de l'image

const NCEPage = () => {
  const navigate = useNavigate();

  const handleSuspendUser = () => {
    alert("Suspendre un utilisateur");
  };

  const handleTemporaryDeleteUser = () => {
    alert("Supprimer temporairement un utilisateur");
  };

  return (
    <div
    className="flex flex-col min-h-screen"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "contain", // Changed from cover to contain
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
      <Header /> {/* Ajout du Header ici */}
      <div className="flex flex-col items-center justify-center flex-grow mb-11">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">NCE</h1>
        <p className="text-lg text-black-600 mb-10">Welcome to the NCE access management page.</p>

        <button
          className="mt-6 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-800 transition"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {/* Bouton pour aller vers la page de création d'un utilisateur */}
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-green-600 transition"
            onClick={() => navigate("/create-nceuser/NCE")}
          >
            Creating a new user
          </button>

          {/* Bouton pour aller vers la page de modification d'un utilisateur */}
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/modify-nceuser/NCE")}
          >
            Modify User
          </button>

          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-yellow-600 transition"
            onClick={() => navigate(`/suspend-user/NCE`)}
            >
            Suspend User
          </button>

          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={() => navigate(`/delete-user/NCE`)}
            >
            Temporary Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default NCEPage;
