import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-keycloak.png";

const ModifyUserkeycloak = () => {
  const navigate = useNavigate();
  const [searchUsername, setSearchUsername] = useState("");
  const [user, setUser] = useState({
    id: "",
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    enabled: true
  });
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Nouvelle approche : chercher d'abord tous les utilisateurs puis filtrer
      const response = await fetch('http://localhost:5254/api/Users', {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users = await response.json();
      console.log("All users:", users);

      // Recherche de l'utilisateur par username
      const foundUser = users.find(u => u.username.toLowerCase() === searchUsername.toLowerCase());
      
      if (!foundUser) {
        throw new Error(`No user found with username: ${searchUsername}`);
      }

      console.log("Found user:", foundUser);

      // Mise à jour de l'état avec les informations trouvées
      setUser({
        id: foundUser.id,
        username: foundUser.username,
        firstName: foundUser.firstName || "",
        lastName: foundUser.lastName || "",
        email: foundUser.email || "",
        enabled: foundUser.enabled
      });

      setError("");

    } catch (error) {
      console.error("Search error:", error);
      setError(error.message);
      // Réinitialisation de l'utilisateur en cas d'erreur
      setUser({
        id: "",
        username: "",
        firstName: "",
        lastName: "",
        email: "",
        enabled: true
      });
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z]+\.[a-zA-Z]+@orange\.com$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(user.email)) {
      setEmailError("Email must be in format: firstname.lastname@orange.com");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5254/api/Users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          enabled: user.enabled
        })
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        navigate(-1);
      } else {
        const errorData = await response.json();
        setError(`Error modifying user: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error modifying user:", error);
      setError("Network or server error occurred");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-grow">
        <div className="w-1/4 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "80%" }}
        />

        <div className="w-2/4 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Edit User</h1>
          
          {/* Formulaire de recherche */}
          <form onSubmit={searchUser} className="bg-white p-6 rounded shadow-md w-80 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700">Search by Username</label>
              <input
                type="text"
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                className="border rounded w-full p-2"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              {loading ? "Searching..." : "Search User"}
            </button>
          </form>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {user.id && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={user.firstName}
                  onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={user.lastName}
                  onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                  className="border rounded w-full p-2"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">E-mail</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                    if (!validateEmail(e.target.value)) {
                      setEmailError("Email must be in format: firstname.lastname@orange.com");
                    } else {
                      setEmailError("");
                    }
                  }}
                  className={`border rounded w-full p-2 ${emailError ? 'border-red-500' : ''}`}
                  placeholder="firstname.lastname@orange.com"
                  required
                />
                {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    checked={user.enabled}
                    onChange={(e) => setUser({ ...user, enabled: e.target.checked })}
                    className="mr-2"
                  />
                  Enable User
                </label>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  value={user.username}
                  disabled
                  className="border rounded w-full p-2 bg-gray-100"
                />
              </div>

              <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Save changes
              </button>
            </form>
          )}

          <button 
            onClick={() => navigate(-1)} 
            className="mt-4 text-orange-500 hover:text-orange-600"
          >
            Back
          </button>
        </div>

        <div className="w-1/4 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "80%" }}
        />
      </div>
    </div>
  );
};

export default ModifyUserkeycloak;