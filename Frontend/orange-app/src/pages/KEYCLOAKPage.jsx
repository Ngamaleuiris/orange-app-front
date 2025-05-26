import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-keycloak.png";

const KEYCLOAKPage = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Animation au chargement de la page
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Données des cartes
  const cards = [
    {
      id: 'create',
      title: 'Créer',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      description: "Création d'un nouvel utilisateur avec attribution des droits",
      route: "/create-keycloakuser/KEYCLOAK",
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 'modify',
      title: 'Modifier',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      description: "Modification des informations ou droits d'un utilisateur existant",
      route: "/modify-keycloakuser/KEYCLOAK",
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 'suspend',
      title: 'Suspendre',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      description: "Suspension temporaire d'un compte utilisateur",
      route: "/suspend-keycloakuser",
      color: "from-yellow-500 to-amber-600"
    },
    {
      id: 'delete',
      title: 'Supprimer',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      description: "Suppression définitive d'un compte utilisateur",
      route: "/delete-keycloakuser",
      color: "from-red-500 to-rose-600"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      
      <div className={`flex flex-grow transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        {/* Partie gauche avec l'image et effet de parallaxe */}
        <div className="relative w-1/2 overflow-hidden bg-gradient-to-br from-orange-50 to-gray-100">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Image principale avec effet pulsation subtil */}
            <div className="relative transform hover:scale-105 transition-all duration-700">
              <div className="absolute inset-0 bg-orange-500 rounded-full opacity-10 animate-pulse-slow"></div>
              <img 
                src={backgroundImage} 
                alt="Keycloak" 
                className="w-4/5 h-4/5 object-contain z-10 relative drop-shadow-xl"
                style={{ filter: "drop-shadow(0 0 10px rgba(240, 110, 0, 0.3))" }}
              />
            </div>
          </div>

          {/* Éléments décoratifs en arrière-plan */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-500 rounded-full mix-blend-multiply opacity-10 animate-float"></div>
          <div className="absolute bottom-10 left-20 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply opacity-10 animate-float-delayed"></div>
          <div className="absolute top-1/4 right-10 w-20 h-20 bg-green-500 rounded-full mix-blend-multiply opacity-10 animate-float-slow"></div>
        </div>
        
        {/* Partie droite avec le contenu */}
        <div className="w-1/2 flex flex-col items-center justify-center p-8 bg-white">
          <div className="w-full max-w-2xl">
            {/* En-tête avec animation */}
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-bold mb-4 relative inline-block">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-transparent bg-clip-text">KEYCLOAK</span>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </h1>
              <p className="text-lg text-gray-600">
                Plateforme de gestion sécurisée des identités et des accès
              </p>
            </div>

            {/* Grille de cartes avec hover effects */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {cards.map((card) => (
                <div
                  key={card.id}
                  className={`relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer group`}
                  onMouseEnter={() => setActiveSection(card.id)}
                  onMouseLeave={() => setActiveSection(null)}
                  onClick={() => navigate(card.route)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-80 group-hover:opacity-90 transition-opacity`}></div>
                  
                  <div className="relative p-6 text-white z-10 transition-all duration-300 group-hover:translate-y-0">
                    <div className="flex items-center mb-4">
                      <div className="p-2 bg-white bg-opacity-20 rounded-lg mr-4">
                        {card.icon}
                      </div>
                      <h3 className="text-xl font-bold">{card.title}</h3>
                    </div>
                    
                    <p className={`text-sm opacity-80 transition-all duration-300 ${activeSection === card.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0 md:opacity-80'}`}>
                      {card.description}
                    </p>
                    
                    <div className="absolute bottom-4 right-4 transform translate-x-8 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bouton de retour avec effet de survol */}
            <div className="flex justify-center">
              <button
                className="group px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-all duration-300 flex items-center space-x-2"
                onClick={() => navigate("/dashboard")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Retour au Tableau de Bord</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS pour les animations personnalisées */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-delayed {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes float-slow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse-slow {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.05); opacity: 0.15; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 7s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
      `}</style>
    </div>
  );
};

export default KEYCLOAKPage;