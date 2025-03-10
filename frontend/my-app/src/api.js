import axios from 'axios';

// Créer une instance axios avec la configuration de base
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '',
});

export default api;