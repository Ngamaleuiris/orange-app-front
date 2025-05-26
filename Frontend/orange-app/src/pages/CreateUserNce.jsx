import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-nce.png";

const CreateUserNce = ({ toolName }) => {
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
    setEmailError(validateEmail(value) ? "" : "Email must be in format: firstname.lastname@orange.com");
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
    <div className="relative min-h-screen flex flex-col bg-white overflow-hidden">
      <Header />

      {/* Décorations avec l’image en fond, positionnées sans toucher le header */}
      <div className="absolute top-[100px] left-4 w-20 opacity-20 rotate-12 z-0">
        <img src={backgroundImage} alt="decor" />
      </div>
      <div className="absolute top-[200px] right-8 w-24 opacity-20 -rotate-12 z-0">
        <img src={backgroundImage} alt="decor" />
      </div>
      <div className="absolute bottom-10 left-10 w-28 opacity-20 rotate-3 z-0">
        <img src={backgroundImage} alt="decor" />
      </div>
      <div className="absolute bottom-20 right-20 w-20 opacity-20 -rotate-6 z-0">
        <img src={backgroundImage} alt="decor" />
      </div>
      <div className="absolute top-1/2 left-[10%] w-16 opacity-20 rotate-6 z-0">
        <img src={backgroundImage} alt="decor" />
      </div>
      <div className="absolute top-1/2 right-[10%] w-16 opacity-20 -rotate-6 z-0">
        <img src={backgroundImage} alt="decor" />
      </div>

      {/* Contenu principal */}
      <div className="flex-grow flex items-center justify-center px-4 py-10 z-10">
        <div className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-2xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-orange-500 text-center mb-6">
            Create a new user {toolName}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CUID</label>
              <input
                type="text"
                value={cuid}
                onChange={(e) => setCuid(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="firstname.lastname@orange.com"
                className={`mt-1 block w-full rounded-lg shadow-sm p-2 border ${emailError ? 'border-red-500' : 'border-gray-300'} focus:ring-orange-500 focus:border-orange-500`}
                required
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Add user
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={handleBack} className="text-orange-500 hover:underline text-sm">
              &larr; Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserNce;
