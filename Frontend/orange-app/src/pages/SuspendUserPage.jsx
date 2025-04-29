import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header"; // Assurez-vous que le chemin est correct
import backgroundImage from "../assets/img-nce.png"; // Import de l'image

const SuspendUserPage = () => {
  const { toolName } = useParams();
  const navigate = useNavigate();

  const handleSuspend = () => {
    alert(`L'utilisateur de ${toolName} a été suspendu.`);
    navigate(`/dashboard`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
     
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Suspend User - {toolName}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Are you sure you want to suspend this user from {toolName}?
        </p>

        <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            onClick={handleSuspend}
          >
            Confirm Suspension
          </button>

          <button
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuspendUserPage;
