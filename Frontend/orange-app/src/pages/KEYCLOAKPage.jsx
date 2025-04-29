import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-keycloak.png";

const KEYCLOAKPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        {/* Partie gauche avec l'image */}
        <div className="w-1/2 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "80%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            imageRendering: "crisp-edges"
          }}
        />

        {/* Partie droite avec le contenu */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-bold text-black-600 mb-6">KEYCLOAK</h1>
          <p className="text-lg text-black-600 mb-8">Welcome to the KEYCLOAK access management page.</p>

          <div className="grid grid-cols-2 gap-6 mt-8 mb-12 w-full max-w-2xl">
            <button
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-green-600 transition"
              onClick={() => navigate("/create-keycloakuser/KEYCLOAK")}
            >
              Creating a new user
            </button>

            <button
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-blue-600 transition"
              onClick={() => navigate("/modify-keycloakuser/KEYCLOAK")}
            >
              Modify User
            </button>

            <button
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-yellow-600 transition"
              onClick={() => navigate(`/suspend-user/KEYCLOAK`)}
            >
              Suspend User
            </button>

            <button
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={() => navigate(`/delete-user/KEYCLOAK`)}
            >
              Temporary Delete User
            </button>
          </div>

          <button
            className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default KEYCLOAKPage;