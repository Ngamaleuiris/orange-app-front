import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import backgroundImage from "../assets/img-nce.png";

const ModifyUserNce = () => {
  const { tool } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    cuid: "",
    password: "",
    newPassword: "",
    role: "User",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User modified in ${tool}: ${user.cuid}, ${user.role}`);
    navigate(-1);
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-white overflow-hidden">
      <Header />

      {/* Images décoratives */}
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
      <div className="flex flex-col items-center justify-center flex-grow px-4 py-10 z-10">
        <h1 className="text-3xl font-bold mb-6 text-orange-500">Edit User</h1>

        <form
          onSubmit={handleSubmit}
          className="backdrop-blur-md bg-white/80 border border-gray-200 shadow-2xl rounded-2xl p-6 w-full max-w-md space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">CUID:</label>
            <input
              type="text"
              value={user.cuid}
              onChange={(e) => setUser({ ...user, cuid: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password:</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">New Password:</label>
            <input
              type="password"
              value={user.newPassword}
              onChange={(e) => setUser({ ...user, newPassword: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Role:</label>
            <select
              value={user.role}
              onChange={(e) => setUser({ ...user, role: e.target.value })}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm p-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Save changes
          </button>
        </form>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 text-orange-500 hover:underline text-sm"
        >
          &larr; Back
        </button>
      </div>
    </div>
  );
};

export default ModifyUserNce;
