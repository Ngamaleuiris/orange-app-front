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
    { name: "NOMAD", path: "/nomad", image: imgNomad },
    { name: "KEYCLOAK TOOL", path: "/keycloaktool", image: imgKeycloak }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <Header />

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-orange-800 mb-4">TRANSMISSION TOOLS</h1>
          <p className="text-orange-600 text-lg">Centralized management of your tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {outils.map((outil, index) => (
            <button
              key={index}
              className="group bg-white/90 p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center border border-orange-100 hover:border-orange-200 hover:scale-105"
              onClick={() => navigate(outil.path)}
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                <img
                  src={outil.image}
                  alt={outil.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 group-hover:from-orange-500 group-hover:to-amber-500 uppercase tracking-tight">{outil.name}</span>
            </button>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="text-orange-600 hover:text-orange-700 font-medium py-3 px-8 rounded-xl hover:bg-orange-50 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;