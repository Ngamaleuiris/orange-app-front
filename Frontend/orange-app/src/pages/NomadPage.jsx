import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/img-nomad.png";
import NOMADUsersTable from "../components/NOMADUsersTable";
import Header from "../components/Header";

const NomadPage = () => {
  const navigate = useNavigate();
  const [showSupportInfo, setShowSupportInfo] = useState(false);

  const handleCreateUser = () => {
    navigate("/create-nomaduser/NOMAD");
  };

  const handleModifyUser = () => {
    navigate("/modify-nomaduser/NOMAD");
  };

  const handleDeleteUser = () => {
    navigate("/delete-user/NOMAD");
  };

  const handleSuspendUser = () => {
    navigate("/suspend-user/NOMAD");
  };

  const toggleSupportInfo = () => {
    setShowSupportInfo(!showSupportInfo);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 to-amber-100 relative">
      {/* Images décoratives positionnées stratégiquement */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-15">
        <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-0 right-0 w-64 h-64 opacity-15">
        <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-1/3 right-10 w-32 h-32 opacity-10">
        <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
      </div>
      <div className="absolute bottom-1/4 left-10 w-32 h-32 opacity-10">
        <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
      </div>

      {/* Header moderne avec effet de verre */}
      <Header title="NOMAD ACCESS" showBackButton={true} onBackClick={() => navigate("/dashboard")} />

      {/* Décoration visuelle */}
      <div className="absolute top-24 left-0 w-48 h-48 bg-orange-400 rounded-full opacity-10 -ml-24"></div>
      <div className="absolute top-64 right-0 w-96 h-96 bg-amber-400 rounded-full opacity-10 -mr-48"></div>
      <div className="absolute bottom-12 left-1/4 w-64 h-64 bg-yellow-400 rounded-full opacity-10"></div>

      <main className="flex-grow flex items-center justify-center py-16 px-4 relative z-10">
        <div className="max-w-5xl w-full">
          {/* Titre et introduction avec animation */}
          <div className="text-center mb-12 transform transition-all duration-700 ease-out hover:scale-105 relative">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent mb-4">
              NOMAD ACCESS
            </h1>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto relative">
              Welcome to the NOMAD access management platform.
            </p>
          </div>

          {/* Carte principale interactive */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-orange-100 relative">
            {/* Image décorative dans les coins */}
            <div className="absolute -right-10 -top-10 w-40 h-40 opacity-10">
              <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
            </div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 opacity-10">
              <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
            </div>

            {/* Barre supérieure colorée */}
            <div className="h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-400"></div>
            
            <div className="p-8 relative">
              {/* Tableau de gestion des utilisateurs NOMAD */}
              <div className="mt-8 mb-8">
                <NOMADUsersTable />
              </div>

              {/* Bouton retour avec effet hover avancé */}
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/dashboard")}
                  className="group flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-orange-100 shadow-sm hover:bg-orange-50 transition-all duration-300"
                >
                  <svg className="w-5 h-5 text-orange-500 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  <span className="text-gray-700 group-hover:text-orange-600 transition-colors">Back to Dashboard</span>
                </button>
              </div>
            </div>
          </div>

          {/* Message d'aide en bas de page */}
          <div className="mt-10 text-center relative">
            <p className="text-gray-500 text-sm">
              For technical support with NOMAD access management, please contact 
              <button 
                onClick={toggleSupportInfo}
                className="text-orange-600 hover:underline ml-1 focus:outline-none"
              >
                IT Support
              </button>
            </p>
            
            {/* Volet d'information du support */}
            {showSupportInfo && (
              <div className="mt-4 p-4 bg-white rounded-lg shadow-md border border-orange-100 max-w-md mx-auto animate-fadeIn">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-orange-600 mb-2">Contact IT Support</h3>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li className="flex items-start">
                        <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                        <span>Email: <a href="mailto:support.internet@orange.cm" className="text-orange-600 hover:underline">support.internet@orange.cm</a></span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-4 h-4 mr-2 mt-0.5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                        <span>Phone: <a href="tel:3900" className="text-orange-600 hover:underline">3900</a> (Orange internal)</span>
                      </li>
                    </ul>
                  </div>
                  <button 
                    onClick={toggleSupportInfo}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default NomadPage;