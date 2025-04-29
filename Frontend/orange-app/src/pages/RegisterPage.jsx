import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/img-orange.png";
import logoImage from "../assets/logo orange.png";
import authService from "../services/authService";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    cuid: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const response = await authService.register({
        cuid: formData.cuid,
        password: formData.password,
      });

      if (response) {
        setSuccess(true);
        // Réinitialiser le formulaire
        setFormData({
          cuid: "",
          password: "",
          confirmPassword: "",
        });
        // Redirection vers la page d'accueil
        window.location.href = "http://localhost:3000/";
      }
    } catch (error) {
      setError("Erreur lors de l'inscription: " + (error.message || "Une erreur est survenue"));
      console.error("Erreur d'inscription:", error);
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
          <h2 className="text-xl font-bold mb-4 text-black">Create Account</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              Inscription réussie ! Redirection vers la page de connexion...
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-black text-sm">CUID</label>
              <input
                type="text"
                name="cuid"
                className="w-full px-4 py-3 mt-1 border border-orange-500 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.cuid}
                onChange={handleChange}
                required
                disabled={loading || success}
              />
            </div>

            <div className="mb-4">
              <label className="block text-black text-sm">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-3 mt-1 border border-orange-500 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading || success}
              />
            </div>

            <div className="mb-6">
              <label className="block text-black text-sm">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-4 py-3 mt-1 border border-orange-500 rounded-full focus:ring-2 focus:ring-orange-500 outline-none"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={6}
                disabled={loading || success}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-white font-bold text-lg rounded-full bg-orange-500 hover:bg-orange-600 transition-transform transform hover:scale-105 disabled:opacity-50"
              disabled={loading || success}
            >
              {loading ? "Inscription en cours..." : "S'INSCRIRE"}
            </button>
          </form>

          <p className="mt-4 text-black text-sm text-center">
            <Link to="/" className="text-orange-600 font-bold hover:underline">
              Already have an account? Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
