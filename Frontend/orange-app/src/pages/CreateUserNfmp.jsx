import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-nfmp.png"; // Import de l'image

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
    // Ici, tu enverras les données au backend plus tard
  };

  const handleBack = () => {
    navigate(-1); // Revenir à la page précédente
  };

  return (
    <div
    className="flex flex-col min-h-screen bg-cover bg-center"
    style={{ 
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    }}
  >     
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h2 className="text-2xl font-bold mb-4">Create a new user {toolName}</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">CUID</label>
            <input
              type="text"
              value={cuid}
              onChange={(e) => setCuid(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              className={`border rounded w-full p-2 ${emailError ? 'border-red-500' : ''}`}
              placeholder="firstname.lastname@orange.com"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded w-full p-2"
              required
            />
          </div>
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Add user
          </button>
        </form>
      </div>
      
      {/* Bouton Back centré en bas */}
      <div className="flex justify-center items-center py-6">
        <button onClick={handleBack} className="text-orange-500 hover:underline">
          Back
        </button>
      </div>
    </div>
  );
};

export default CreateUserNfmp;
