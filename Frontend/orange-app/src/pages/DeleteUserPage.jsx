import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header"; // Assurez-vous que le chemin est correct

const DeleteUserPage = () => {
  const { toolName } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    alert(`L'utilisateur de ${toolName} a été supprimé temporairement.`);
    navigate(`/dashboard`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Delete User - {toolName}
        </h1>
        <p className="text-lg text-gray-600 mb-4">
          Are you sure you want to temporarily delete this user from {toolName}?
        </p>

        <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-600 transition"
            onClick={handleDelete}
          >
            Confirm Delete
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

export default DeleteUserPage;
