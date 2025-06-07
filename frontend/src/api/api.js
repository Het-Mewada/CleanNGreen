import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', //  proxy or prod URL base url
});

// Add interceptor
api.interceptors.request.use(
  (config) => {
    if (config.noAuth === true) return config;

    const token = JSON.parse(localStorage.getItem('user')).token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
