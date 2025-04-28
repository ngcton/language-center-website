import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '', // fallback khi dev local
  withCredentials: false,
});

export default axiosInstance;
