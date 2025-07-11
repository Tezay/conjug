import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://backend:5000/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  withCredentials: true, // si tu utilises session ou cookies dans Flask
});

export default axiosInstance;