import axios from 'axios';

const API_URL = 'http://localhost:5254/api/users'; // Correction de l'URL de base

const handleError = (error) => {
  const errorMessage = error.response?.data?.message ||
                       error.response?.data ||
                       error.message;
  throw new Error(errorMessage);
};

export const getUsers = async () => {
  try {
    const res = await axios.get(`${API_URL}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const createUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}`, userData, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateUser = async (userId, data) => {
  try {
    const res = await axios.put(`${API_URL}/${userId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const getUserByUsername = async (username) => {
  try {
    const res = await axios.get(`${API_URL}/byUsername/${username}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const disableUser = async (userId) => {
  try {
    const res = await axios.put(`${API_URL}/${userId}/disable`, {}, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    return res.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await axios.delete(`${API_URL}/${userId}`);
    return res.data;
  } catch (error) {
    handleError(error);
  }
};
