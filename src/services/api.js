import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor: antes de cada request, agrega el token JWT al header automáticamente
// Así no tenés que acordarte de mandarlo manualmente en cada llamada
api.interceptors.request.use((config) => {
  const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
  if (usuario.access) {
    config.headers.Authorization = `Bearer ${usuario.access}`;
  }
  return config;
});

// Interceptor: si el servidor responde 401 (token vencido), manda al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('usuario');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;