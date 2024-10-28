import axios from "axios";

//const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
    baseURL:"https://foodorderwebsitedelicazy.netlify.app/api",
    withCredentials: true,
});
