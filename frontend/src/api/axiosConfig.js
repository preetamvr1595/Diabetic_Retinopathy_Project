import axios from 'axios';

// Use VITE_API_URL if provided (for production), otherwise fall back to empty string for proxying in dev
const API_BASE_URL = import.meta.env.VITE_API_URL || '';
console.log('RetinaCore API Init:', API_BASE_URL || 'Using relative proxy');

const api = axios.create({
    baseURL: API_BASE_URL,
});

export default api;
