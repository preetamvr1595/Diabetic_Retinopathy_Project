import axios from 'axios';

// Use VITE_API_URL if provided, otherwise fall back to the project's specific Render backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://retinacore-api.onrender.com';
console.log('RetinaCore API Init:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
