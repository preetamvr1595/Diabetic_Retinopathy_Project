import axios from 'axios';

// Use VITE_API_URL if provided, otherwise detect if running on localhost to use local backend
const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    return isLocal ? 'http://127.0.0.1:5000' : 'https://retinacore-api.onrender.com';
};

const API_BASE_URL = getBaseUrl();
console.log('RetinaCore API Init:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
