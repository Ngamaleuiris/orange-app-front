import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

// Import des images pour chaque outil
import imgNCE from "../assets/img-nce.png";
import imgNFMP from "../assets/img-nfmp.png";
import imgIMonitor from "../assets/img-imonitor.png";
import imgNomad from "../assets/img-nomad.png";
import imgKeycloak from "../assets/img-keycloak.png";

const SuspendUserPage = () => {
  const { toolName } = useParams();
  const navigate = useNavigate();

  // Sélection de l'image en fonction de l'outil
  const getToolImage = () => {
    switch(toolName.toLowerCase()) {
      case 'nce': return imgNCE;
      case 'nfmp': return imgNFMP;
      case 'imonitor': return imgIMonitor;
      case 'nomad': return imgNomad;
      case 'keycloak': return imgKeycloak;
      default: return null; // Aucune image par défaut
    }
  };

  const toolImage = getToolImage();

  const handleSuspend = () => {
    alert(`L'utilisateur de ${toolName} a été suspendu.`);
    navigate(`/dashboard`);
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        background: "linear-gradient(135deg, #fff8f5 0%, #fff0eb 100%)"
      }}
    >
      {/* Arrière-plan spécifique à l'outil */}
      {toolImage && (
        <div className="absolute inset-0 z-0 opacity-10">
          <div 
            className="absolute top-20 right-20 w-40 h-40"
            style={{ 
              backgroundImage: `url(${toolImage})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              transform: 'rotate(15deg)'
            }}
          ></div>
          <div 
            className="absolute bottom-20 left-20 w-40 h-40"
            style={{ 
              backgroundImage: `url(${toolImage})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              transform: 'rotate(-15deg)'
            }}
          ></div>
        </div>
      )}

      {/* Le reste du contenu reste inchangé */}
      <div className="relative z-10">
        <Header />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-8">
        <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden border border-orange-100 transform transition-all hover:scale-[1.01]">
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">
              Suspend User - {toolName}
            </h1>
          </div>

          <div className="p-8 space-y-6">
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-orange-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-lg text-gray-700 font-medium">
                Are you sure you want to suspend this user from {toolName}?
              </p>
              <p className="text-gray-500 mt-2">
                This action will temporarily revoke their access.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-lg hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
                onClick={handleSuspend}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Confirm Suspension
              </button>

              <button
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 border border-gray-300 transition-colors duration-300 flex items-center justify-center"
                onClick={() => navigate(-1)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuspendUserPage;