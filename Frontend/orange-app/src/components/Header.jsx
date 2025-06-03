import React, { useState } from "react";
import { FaSearch, FaUser, FaArrowLeft } from "react-icons/fa";
import logoImage from "../assets/logo orange.png";

const Header = ({ onSearch, showBackButton = false, onBackClick, title }) => {
  const [showAdminInfo, setShowAdminInfo] = useState(false);

  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const content = document.body;
    const walk = document.createTreeWalker(
      content,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let node;
    while (node = walk.nextNode()) {
      const parent = node.parentNode;
      if (parent.nodeType === 1) {
        const text = node.textContent.toLowerCase();
        if (searchText && text.includes(searchText)) {
          parent.style.backgroundColor = 'yellow';
        } else {
          parent.style.backgroundColor = '';
        }
      }
    }
  };

  const toggleAdminInfo = () => {
    setShowAdminInfo(!showAdminInfo);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md px-6 py-4 border-b border-orange-100">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo et titre de la page */}
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button
              onClick={onBackClick}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-700"
              aria-label="Retour"
            >
              <FaArrowLeft className="text-xl" />
            </button>
          )}
          <div className="flex items-center space-x-2">
            <img src={logoImage} alt="Orange Logo" className="w-12 h-15" />
            <span className="font-bold text-2xl text-gray-800">{title || 'AccessTransmit'}</span>
          </div>
        </div>

        {/* Barre de recherche */}
        <div className="relative flex-1 mx-4 max-w-md hidden md:block"> {/* Masquer sur petits écrans si nécessaire */}
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-full focus:outline-none w-full focus:ring-2 focus:ring-orange-500"
            onChange={handleSearch}
          />
          <FaSearch className="absolute right-3 top-3 text-gray-400" />
        </div>

        {/* Icônes Admin - Transformé en bouton */}
        <div className="relative">
          <button 
            onClick={toggleAdminInfo}
            className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Informations Administrateur"
          >
            <span className="text-lg text-gray-700">Admin</span>
            <FaUser className="text-xl text-gray-700" />
          </button>

          {showAdminInfo && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 border border-orange-100 animate-fadeIn">
              <div className="block px-4 py-2 text-sm text-gray-700">
                <p className="font-bold text-orange-600">Admin Info</p>
                <p>Email: iris.ngamaleu@orange.com</p>
                <p>CUID: GNVD8052</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;