import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Assurez-vous que le chemin est correct
import backgroundImage from "../assets/img-nfmp.png"; // Import de l'image

const NFMPPage = () => {
  const navigate = useNavigate();

  const handleSuspendUser = () => {
    alert("Suspendre un utilisateur");
  };

  const handleTemporaryDeleteUser = () => {
    alert("Supprimer temporairement un utilisateur");
  };

  return (
    <div 
    className="flex flex-col min-h-screen bg-cover bg-center"
    style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >         <Header /> {/* Ajout du Header ici */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold text-black-600 mb-6">NFMP</h1>
        <p className="text-lg text-black-600">Welcome to the NFMP access management page.</p>

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
            onClick={() => navigate("/create-nfmpuser/NFMP")}
          >
            Creating a new user
          </button>

          {/* Bouton pour aller vers la page de modification d'un utilisateur */}
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate("/modify-nfmpuser/NFMP")}
          >
            Modify User
          </button>

          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-yellow-600 transition"
            onClick={() => navigate(`/suspend-user/NFMP`)}
            >
            Suspend User
          </button>

          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-red-600 transition"
            onClick={() => navigate(`/delete-user/NFMP`)}
            >
            Temporary Delete User
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFMPPage;
