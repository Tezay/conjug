import axios from "../Api/axiosInstance";
import qs from "qs"; // pour formater le body

export const fetchInitialData = async (lang) => {
  const response = await axios.get(`/${lang}`);
  return response.data;
};

export const postConjugaisonRequest = async (lang, body) => {
  const response = await axios.post(`/${lang}`, qs.stringify(body));
  return response.data;
};