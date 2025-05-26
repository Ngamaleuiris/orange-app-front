import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/img-orange.png";
import logoImage from "../assets/logo orange.png";
import authService from "../services/authService";

const LoginPage = () => {
  const [cuid, setCuid] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Au chargement du composant, vérifier si un CUID est stocké
  useEffect(() => {
    const rememberedCuid = localStorage.getItem("rememberedCuid");
    if (rememberedCuid) {
      setCuid(rememberedCuid);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login(cuid, password);
      if (response) {
        // Si "Remember me" est coché, stocker le CUID dans le localStorage
        if (rememberMe) {
          localStorage.setItem("rememberedCuid", cuid);
        } else {
          // Sinon, supprimer le CUID précédemment stocké
          localStorage.removeItem("rememberedCuid");
        }
        navigate("/dashboard");
      }
    } catch (error) {
      setError("Identifiants incorrects ou problème de connexion");
      console.error("Erreur de connexion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{
        fontFamily: "Arial",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col md:flex-row w-[850px] rounded-lg shadow-lg bg-white overflow-hidden">
        {/* Section gauche */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-black p-6 relative">
          <img src={logoImage} alt="Logo" className="absolute top-4 left-4 w-16 h-16" />
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-2">ACCESS TRANSMIT</h2>
            <p className="text-base">Welcome Page</p>
          </div>
        </div>

        {/* Section droite - Formulaire */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-xl font-bold mb-4 text-black">Login Your Account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-black text-sm">CUID</label>
              <input
                type="text"
                className="w-full px-4 py-3 mt-1 border border-orange-500 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
                value={cuid}
                onChange={(e) => setCuid(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm">Password</label>
              <input
                type="password"
                className="w-full px-4 py-3 mt-1 border border-orange-500 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex justify-between items-center mb-6">
              <div>
                <input 
                  type="checkbox" 
                  id="remember" 
                  className="mr-2" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember" className="text-black text-sm">Remember me</label>
              </div>
              <a href="#" className="text-sm text-orange-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white font-bold text-lg rounded-full bg-orange-500 hover:bg-orange-600 transition-transform transform hover:scale-105 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Connexion en cours..." : "SE CONNECTER"}
            </button>
          </form>

          <p className="mt-4 text-black text-sm text-center">
            <Link to="/register" className="text-orange-600 font-bold hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;