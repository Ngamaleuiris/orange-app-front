import React from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import logoImage from "../assets/logo orange.png";

const Header = ({ onSearch }) => {
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

  return (
    <header className="bg-black text-white flex justify-between items-center px-6 py-3">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logoImage} alt="Orange Logo" className="w-12 h-15" />
        <span className="text-xl font-bold">AccessTransmit</span>
      </div>

      {/* Barre de recherche */}
      <div className="relative">
        <input
          type="text"
          placeholder="Rechercher..."
          className="bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none"
          onChange={handleSearch}
        />
        <FaSearch className="absolute right-3 top-3 text-gray-400" />
      </div>

      {/* Icônes Admin */}
      <div className="flex items-center space-x-4">
        <span className="text-lg">Admin</span>
        <FaUser className="text-xl" />
      </div>
    </header>
  );
};

export default Header;