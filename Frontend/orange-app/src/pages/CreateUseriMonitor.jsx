import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-imonitor.png";

const CreateUseriMonitor = ({ toolName }) => {
  const navigate = useNavigate();
  const [cuid, setCuid] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    
    setIsSubmitting(true);
    console.log(`New user for ${toolName}:`, { cuid, email, password });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1500);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 relative">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border border-orange-200 relative">
          {/* Image decorative in empty spaces */}
          <div className="absolute -right-20 -top-20 w-64 h-64 opacity-20">
            <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
          </div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 opacity-20">
            <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
          </div>

          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 relative z-10">
            <h2 className="text-2xl font-bold text-white text-center">
              Create a new user for {toolName}
            </h2>
          </div>
          
          {/* Form with protected content area */}
          <div className="p-6 bg-white/90 relative z-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* CUID Field */}
              <div>
                <label htmlFor="cuid" className="block text-gray-700 font-medium mb-2">
                  CUID
                </label>
                <input
                  type="text"
                  id="cuid"
                  value={cuid}
                  onChange={(e) => setCuid(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white"
                  placeholder="Enter CUID"
                  required
                />
              </div>
              
              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-4 py-3 rounded-lg border ${emailError ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white`}
                  placeholder="firstname.lastname@orange.com"
                  required
                />
                {emailError && (
                  <p className="mt-2 text-sm text-red-600">{emailError}</p>
                )}
              </div>
              
              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all bg-white"
                  placeholder="Enter password"
                  required
                />
              </div>
              
              {/* Buttons */}
              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300 flex items-center space-x-2 border border-gray-300 hover:border-orange-300 shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Back</span>
                </button>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-70 shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      <span>Add user</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Additional decorative images in page margins */}
        <div className="hidden md:block fixed left-4 bottom-4 w-32 h-32 opacity-20">
          <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
        </div>
        <div className="hidden md:block fixed right-4 top-1/2 w-32 h-32 opacity-20 transform -translate-y-1/2">
          <img src={backgroundImage} alt="Decorative" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  );
};

export default CreateUseriMonitor;