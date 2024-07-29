import axios from "axios";
import { useNavigate } from "react-router-dom";
import {SUPER_ADMIN_BASE_URL} from "../config"
const instance = axios.create({
  baseURL: SUPER_ADMIN_BASE_URL,
});

// Request interceptor to attach token
instance.interceptors.request.use(
  (config) => {
    const token =
      JSON.parse(sessionStorage.getItem("Token")) ||
      JSON.parse(localStorage.getItem("Token"));
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      handleLogout();
    }
    return Promise.reject(error);
  }
);

const handleLogout = () => {
  sessionStorage.removeItem("Token");
  localStorage.removeItem("Token");
  window.location.href = "/login"; // Redirect to login page
};

export default instance;
