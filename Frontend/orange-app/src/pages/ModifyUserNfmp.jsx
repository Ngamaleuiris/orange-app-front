import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-nfmp.png";

const ModifyUserNfmp = () => {
  const { tool } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    cuid: "",
    password: "",
    newPassword: "",
    role: "User",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User modified in ${tool}: ${user.cuid}, ${user.role}`);
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-50 overflow-hidden">
      {/* Arrière-plan artistique avec motifs positionnés stratégiquement */}
      <div className="absolute inset-0 z-0">
        {/* Grand logo en bas à gauche - taille importante mais discrète */}
        <div 
          className="absolute left-0 bottom-0 w-64 h-64 opacity-10"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left bottom',
            transform: 'rotate(-15deg)'
          }}
        ></div>

        {/* Logo moyen en haut à droite */}
        <div 
          className="absolute right-10 top-20 w-48 h-48 opacity-15"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: 'rotate(10deg)'
          }}
        ></div>

        {/* Petit logo centré légèrement décalé */}
        <div 
          className="absolute left-1/2 top-1/3 w-32 h-32 opacity-20"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: 'translateX(-50%) rotate(5deg)'
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Header />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl overflow-hidden border border-orange-100">
          {/* En-tête avec effet de profondeur */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-4 text-center relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-32 h-32 opacity-20"
              style={{ 
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat'
              }}
            ></div>
            <h1 className="text-xl font-bold text-white relative">
              Edit User for {tool}
            </h1>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Contenu du formulaire inchangé... */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CUID</label>
                <input
                  type="text"
                  value={user.cuid}
                  onChange={(e) => setUser({ ...user, cuid: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                <input
                  type="password"
                  value={user.newPassword}
                  onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={user.role}
                  onChange={(e) => setUser({ ...user, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center text-orange-600 hover:text-orange-800 text-sm font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-5 rounded-md shadow-md hover:shadow-lg transition-all"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModifyUserNfmp;