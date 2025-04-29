import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ModifyUserPage = () => {
  const { tool } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    cuid: "",
    role: "User",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`User modified in ${tool}: ${user.username}, ${user.cuid}, ${user.role}`);
    navigate(-1);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-200">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow">
        <h1 className="text-2xl font-bold mb-4">Edit User</h1>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-80">
          <label className="block mb-2">Username:</label>
          <input
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="border p-2 w-full mb-4"
          />

          <label className="block mb-2">CUID:</label>
          <input
            type="text"
            value={user.cuid}
            onChange={(e) => setUser({ ...user, cuid: e.target.value })}
            className="border p-2 w-full mb-4"
          />

          <label className="block mb-2">Role:</label>
          <select
            value={user.role}
            onChange={(e) => setUser({ ...user, role: e.target.value })}
            className="border p-2 w-full mb-4"
          >
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save changes
          </button>
        </form>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 text-blue-500 hover:text-blue-600"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ModifyUserPage;