import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-keycloak.png";

const CreateUserkeycloak = ({ toolName }) => {
  const navigate = useNavigate();
  // États alignés avec CreateUserRequest
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

    try {
      const response = await fetch("http://localhost:5254/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          enabled: formData.enabled,
          firstName: formData.firstName,
          lastName: formData.lastName,
          credentials: [{
            type: "password",
            value: formData.credentials[0].value,
            temporary: false
          }]
        })
      });

      if (response.ok) {
        const data = await response.json();
        alert("User created successfully!");
        // Reset form
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
        navigate(-1); // Retour à la page précédente après création réussie
      } else {
        const errorData = await response.json();
        alert(`Error creating user: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Network or server error occurred");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <div className="w-1/2 flex flex-col items-center justify-center p-4">
          <h2 className="text-2xl font-bold mb-4">Create a new user {toolName}</h2>
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">E-mail</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                value={formData.credentials[0].value}
                onChange={handleChange}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={(e) => setFormData({...formData, enabled: e.target.checked})}
                  className="mr-2"
                />
                Enable User
              </label>
            </div>
            <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
              Add user
            </button>
          </form>
          <div className="mt-6">
            <button onClick={() => navigate(-1)} className="text-orange-500 hover:underline">
              Back
            </button>
          </div>
        </div>

        <div className="w-1/2 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "70%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            imageRendering: "crisp-edges"
          }}
        />
      </div>
    </div>
  );
};

export default CreateUserkeycloak;
