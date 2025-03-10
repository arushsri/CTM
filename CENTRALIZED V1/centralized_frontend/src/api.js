import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/auth";

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, userData);
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/login/`, credentials);
};

export const getUserDetails = async (token) => {
  return axios.get(`${API_URL}/user/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};