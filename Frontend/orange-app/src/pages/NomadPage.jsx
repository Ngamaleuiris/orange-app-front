import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/img-nomad.png";

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
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md px-6 py-4 border-b border-orange-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-lg bg-orange-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002 2v-7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
            <span className="font-bold text-2xl text-gray-800">NOMAD</span>
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li><button className="text-gray-700 hover:text-orange-600 transition">Dashboard</button></li>
              <li><button className="text-gray-700 hover:text-orange-600 transition">Analytics</button></li>
              <li><button className="text-gray-700 hover:text-orange-600 transition">Settings</button></li>
            </ul>
          </nav>
        </div>
      </header>

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
              {/* Section des cartes fonctionnelles */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Carte 1 - Create */}
                <div className="bg-white rounded-xl shadow p-5 border border-orange-100 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                  <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-br from-orange-100 to-orange-50 rounded-bl-full z-0"></div>
                  <div className="absolute -bottom-2 -left-2 h-16 w-16 bg-orange-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 p-2 bg-orange-100 rounded-lg inline-block">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Create User</h3>
                    <p className="text-gray-600 text-sm mb-4">Add new users with custom access rights</p>
                    <button
                      onClick={handleCreateUser}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg shadow transition-colors"
                    >
                      Create
                    </button>
                  </div>
                </div>

                {/* Carte 2 - Modify */}
                <div className="bg-white rounded-xl shadow p-5 border border-amber-100 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                  <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-br from-amber-100 to-amber-50 rounded-bl-full z-0"></div>
                  <div className="absolute -bottom-2 -left-2 h-16 w-16 bg-amber-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 p-2 bg-amber-100 rounded-lg inline-block">
                      <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Modify User</h3>
                    <p className="text-gray-600 text-sm mb-4">Update existing users and permissions</p>
                    <button
                      onClick={handleModifyUser}
                      className="w-full bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg shadow transition-colors"
                    >
                      Modify
                    </button>
                  </div>
                </div>

                {/* Carte 3 - Suspend */}
                <div className="bg-white rounded-xl shadow p-5 border border-yellow-100 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                  <div className="absolute right-0 top-0 h-20 w-20 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-bl-full z-0"></div>
                  <div className="absolute -bottom-2 -left-2 h-16 w-16 bg-yellow-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 p-2 bg-yellow-100 rounded-lg inline-block">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Suspend User</h3>
                    <p className="text-gray-600 text-sm mb-4">Temporarily disable user access</p>
                    <button
                      onClick={handleSuspendUser}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg shadow transition-colors"
                    >
                      Suspend
                    </button>
                  </div>
                </div>

                {/* Carte 4 - Delete */}
                <div className="bg-white rounded-xl shadow p-5 border border-red-100 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
                  <div className="absolute right-0 top-0 w-20 h-20 bg-gradient-to-br from-red-100 to-red-50 rounded-bl-full z-0"></div>
                  <div className="absolute -bottom-2 -left-2 h-16 w-16 bg-red-100 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="mb-4 p-2 bg-red-100 rounded-lg inline-block">
                      <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 mb-1">Delete User</h3>
                    <p className="text-gray-600 text-sm mb-4">Temporarily remove user accounts</p>
                    <button
                      onClick={handleDeleteUser}
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg shadow transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              {/* Séparateur décoratif */}
              <div className="flex items-center my-8">
                <div className="flex-grow h-px bg-gradient-to-r from-transparent via-orange-200 to-transparent"></div>
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