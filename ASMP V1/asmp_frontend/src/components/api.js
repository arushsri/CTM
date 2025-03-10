import axios from "axios";

const CENTRALIZED_BACKEND_URL = "http://127.0.0.1:8000/api/auth/login/";
const ASMP_BACKEND_URL = "http://127.0.0.1:8001/api/auth/save-user/";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(CENTRALIZED_BACKEND_URL, { username, password });
    const userData = response.data;
    
    await axios.post(ASMP_BACKEND_URL, { username, password });

    localStorage.setItem("userData", JSON.stringify(userData));
    
    return { success: true, userData };
  } catch (error) {
    return { success: false, error: error.response?.data?.error || "Login failed" };
  }
};