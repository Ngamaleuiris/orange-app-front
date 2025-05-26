import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pencil, Trash2, Key } from 'lucide-react';
import EditUserModal from './EditUserModal';
import ResetPasswordModal from './ResetPasswordModal';
import DeleteUserModal from './DeleteUserModal';

const UsersTable = ({ tool }) => {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit', 'password', 'delete'

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5254/api/users-excel/${tool}`);
      setHeaders(response.data.headers);
      setRows(response.data.rows);
    } catch (err) {
      console.error("Erreur de chargement :", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [tool]);

  const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalType(null);
  };

  const handleUpdateUser = async (userId, userData) => {
    try {
      const response = await axios.put(`http://localhost:5254/api/users-excel/${tool}/${userId}`, {
        id: userId,
        Role: userData.role
      });

      if (response.status === 200) {
        setRows(prevRows => 
          prevRows.map(row => 
            row.id === userId 
              ? { ...row, Role: userData.role }
              : row
          )
        );
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  };

  const handleResetPassword = async (userId, newPassword) => {
    try {
      const response = await axios.put(`http://localhost:5254/api/users-excel/${tool}/${userId}/password`, {
        password: newPassword
      });
      if (response.status === 200) {
        handleCloseModal();
      }
    } catch (error) {
      console.error('Erreur lors de la réinitialisation:', error);
      throw error;
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:5254/api/users-excel/${tool}/${userId}`);
      if (response.status === 200) {
        setRows(prevRows => prevRows.filter(row => row.id !== userId));
        handleCloseModal();
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      throw error;
    }
  };

  return (
    <div className="overflow-auto">
      <table className="min-w-full table-auto border border-gray-300 text-sm text-left">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-3 py-2 border border-gray-300">{header}</th>
            ))}
            <th className="px-3 py-2 border border-gray-300 text-center">🔐</th>
            <th className="px-3 py-2 border border-gray-300 text-center">✏️</th>
            <th className="px-3 py-2 border border-gray-300 text-center">🗑️</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-50">
              {headers.map((header, j) => (
                <td key={j} className="px-3 py-2 border border-gray-300">{row[header]}</td>
              ))}
              <td className="text-center border border-gray-300">
                <button 
                  onClick={() => handleOpenModal(row, 'password')}
                  className="hover:text-blue-700 transition-colors"
                >
                  <Key className="w-4 h-4 text-blue-500" />
                </button>
              </td>
              <td className="text-center border border-gray-300">
                <button 
                  onClick={() => handleOpenModal(row, 'edit')}
                  className="hover:text-green-700 transition-colors"
                >
                  <Pencil className="w-4 h-4 text-green-600" />
                </button>
              </td>
              <td className="text-center border border-gray-300">
                <button 
                  onClick={() => handleOpenModal(row, 'delete')}
                  className="hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modales */}
      {selectedUser && modalType === 'edit' && (
        <EditUserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onUpdate={handleUpdateUser}
          allUsers={rows}
        />
      )}

      {selectedUser && modalType === 'password' && (
        <ResetPasswordModal
          user={selectedUser}
          onClose={handleCloseModal}
          onReset={handleResetPassword}
        />
      )}

      {selectedUser && modalType === 'delete' && (
        <DeleteUserModal
          user={selectedUser}
          onClose={handleCloseModal}
          onDelete={handleDeleteUser}
        />
      )}
    </div>
  );
};

export default UsersTable;
