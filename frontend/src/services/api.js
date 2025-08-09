import axios from 'axios';

const api = axios.create({
  // New test code
  baseURL: 'https://lims-inventory-manager.onrender.com', headers: {
    'Content-Type': 'application/json',
  },
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;