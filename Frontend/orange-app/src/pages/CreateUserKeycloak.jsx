import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-keycloak.png";

const CreateUserKeycloak = ({ toolName }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    enabled: true,
    firstName: "",
    lastName: "",
    credentials: [{
      type: "password",
      value: "",
      temporary: false
    }]
  });
  const [emailError, setEmailError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z]+\.[a-zA-Z]+@orange\.com$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setFormData({
        ...formData,
        credentials: [{
          ...formData.credentials[0],
          value: value
        }]
      });
    } else if (name === "email") {
      setFormData({
        ...formData,
        email: value
      });
      if (!validateEmail(value)) {
        setEmailError("Email must be in format: firstname.lastname@orange.com");
      } else {
        setEmailError("");
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setEmailError("Email must be in format: firstname.lastname@orange.com");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:5254/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert("User created successfully!");
        setFormData({
          username: "",
          email: "",
          enabled: true,
          firstName: "",
          lastName: "",
          credentials: [{
            type: "password",
            value: "",
            temporary: false
          }]
        });
        navigate(-1);
      } else {
        const errorData = await response.json();
        alert(`Error creating user: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Network or server error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gray-100">
      {/* Arrière-plan stylisé avec l'image */}
      <div className="absolute inset-0 z-0 opacity-20 bg-repeat" 
           style={{ 
             backgroundImage: `url(${backgroundImage})`,
             backgroundSize: '200px',
             backgroundBlendMode: 'overlay',
             backgroundColor: 'rgba(255, 255, 255, 0.9)'
           }}>
      </div>

      {/* Version alternative avec plusieurs images positionnées */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/3 h-full opacity-10"
             style={{
               backgroundImage: `url(${backgroundImage})`,
               backgroundSize: 'contain',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'left center'
             }}></div>
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10"
             style={{
               backgroundImage: `url(${backgroundImage})`,
               backgroundSize: 'contain',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'right center',
               transform: 'scaleX(-1)'
             }}></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-15"
             style={{
               backgroundImage: `url(${backgroundImage})`,
               backgroundSize: '300px',
               backgroundRepeat: 'no-repeat',
               backgroundPosition: 'center',
               transform: 'rotate(5deg)'
             }}></div>
      </div>

      <div className="relative z-10">
        <Header />
      </div>
      
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow p-8">
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-orange-200">
          {/* En-tête avec image de fond stylisée */}
          <div className="relative bg-orange-500 p-6 text-center overflow-hidden">
            <div className="absolute inset-0 opacity-20"
                 style={{
                   backgroundImage: `url(${backgroundImage})`,
                   backgroundSize: '300px',
                   backgroundPosition: 'center'
                 }}></div>
            <h2 className="text-2xl font-bold text-white relative">Create {toolName} User</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Username *</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 ${emailError ? 'focus:ring-red-500' : 'focus:ring-orange-500'} transition-all`}
                  placeholder="firstname.lastname@orange.com"
                  required
                />
                {emailError && <p className="mt-2 text-sm text-red-600 animate-pulse">{emailError}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.credentials[0].value}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 transition-all"
                  required
                />
              </div>
              
              <div className="md:col-span-2 flex items-center">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                  className="h-5 w-5 text-orange-600 rounded focus:ring-orange-500 border-gray-300"
                />
                <label className="ml-3 text-sm text-gray-700">Enable User</label>
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center text-orange-600 hover:text-orange-800 font-medium transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 disabled:opacity-70 flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : "Create User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserKeycloak;