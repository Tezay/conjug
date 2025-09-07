import axios from "axios";

const API_BASE = "/api";


const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true,
});

export default axiosInstance;
