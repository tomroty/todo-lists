import axios from 'axios';

// Create an axios instance with relative URLs
const api = axios.create({
  // No baseURL here - will use relative URLs
  // which will be relative to wherever the app is hosted
});

export default api;