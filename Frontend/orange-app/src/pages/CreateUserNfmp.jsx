import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-nfmp.png";

const CreateUserNfmp = ({ toolName }) => {
  const navigate = useNavigate();
  const [cuid, setCuid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z]+\.[a-zA-Z]+@orange\.com$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError("Email must be in format: firstname.lastname@orange.com");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Email must be in format: firstname.lastname@orange.com");
      return;
    }
    console.log(`New user for ${toolName}:`, { cuid, email, password });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundColor: "#fff8f5" // Fond légèrement orangé
      }}
    >
      {/* Nouvel agencement des images en arrière-plan */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Logo en haut à gauche - taille moyenne */}
        <div 
          className="absolute top-16 left-16 w-40 h-40 opacity-15"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: 'rotate(-10deg)'
          }}
        ></div>
        
        {/* Logo en bas à droite - taille moyenne */}
        <div 
          className="absolute bottom-16 right-16 w-40 h-40 opacity-15"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: 'rotate(10deg)'
          }}
        ></div>
        
        {/* Petit logo centré - très discret */}
        <div 
          className="absolute top-1/2 left-1/2 w-24 h-24 opacity-10"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            transform: 'translate(-50%, -50%) rotate(5deg)'
          }}
        ></div>
      </div>

      <div className="relative z-10">
        <Header />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow px-4 py-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-xl shadow-xl overflow-hidden border border-orange-100 transition-all duration-300 hover:shadow-2xl">
          {/* En-tête avec dégradé orange */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-4 text-center">
            <h2 className="text-xl font-bold text-white">
              Create a new user for {toolName}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CUID</label>
                <input
                  type="text"
                  value={cuid}
                  onChange={(e) => setCuid(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                <input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-3 py-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 ${emailError ? 'focus:ring-red-500' : 'focus:ring-orange-500'} transition-all`}
                  placeholder="firstname.lastname@orange.com"
                  required
                />
                {emailError && <p className="mt-1 text-sm text-red-600 animate-pulse">{emailError}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-between items-center pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="text-orange-600 hover:text-orange-800 text-sm font-medium flex items-center transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
              >
                Add user
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserNfmp;