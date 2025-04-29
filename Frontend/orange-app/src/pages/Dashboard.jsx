import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import imgNce from "../assets/img-nce.png";
import imgNfmp from "../assets/img-nfmp.png";
import imgImonitor from "../assets/img-imonitor.png";
import imgKeycloak from "../assets/img-keycloak.png";
import imgNomad from "../assets/img-nomad.png";

const Dashboard = () => {
  const navigate = useNavigate();

  const outils = [
    { name: "NCE", path: "/nce", image: imgNce },
    { name: "NFMP", path: "/nfmp", image: imgNfmp },
    { name: "IMONITOR", path: "/imonitor", image: imgImonitor },
    { name: "KEYCLOAK", path: "/keycloak", image: imgKeycloak },
    { name: "NOMAD", path: "/nomad", image: imgNomad }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-col items-center justify-center mt-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Transmission Tools</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outils.map((outil, index) => (
            <button
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition flex flex-col items-center"
              onClick={() => navigate(outil.path)}
            >
              <img
                src={outil.image}
                alt={outil.name}
                className="w-16 h-16 mb-4"
              />
              <span className="text-lg font-semibold text-gray-800">{outil.name}</span>
            </button>
          ))}
        </div>

        {/* Bouton KEYCLOAK TOOL */}
        <div className="mt-8">
          <div className="flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg shadow-lg mb-4 hover:shadow-xl transition-shadow duration-300">
              <img
                src={imgKeycloak}
                alt="KEYCLOAK TOOL"
                className="w-32 h-32 object-contain"
              />
            </div>
            <button
              className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105"
              onClick={() => navigate("/keycloaktool")}
            >
              KEYCLOAK TOOL
            </button>
          </div>
        </div>

        <button
          className="mt-12 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
          onClick={() => navigate("/")}
        >
          Back to home
        </button>
      </div>
    </div>
  );
};

export default Dashboard;