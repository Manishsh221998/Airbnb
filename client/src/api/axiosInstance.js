import axios from 'axios';
import { BASE_URL } from './endpoints';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'|| 'multipart/form-data',
  },
});

// Request interceptor to add the auth token to requests
axiosInstance.interceptors.request.use((config) => {
    const token = window.localStorage.getItem('usertoken');
console.log("axiosInstance user token :",token)
    if (token) {
      config.headers.Authorization =token;
    }
    
    // Handle multipart/form-data if needed
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
