import axios from "axios";

const API_BASE = import.meta.env.VITE_BACKEND_URL ||"http://backend.localhost/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

export default axiosInstance;
