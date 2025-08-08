import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL ||"http://localhost:5000/";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

export default axiosInstance;
