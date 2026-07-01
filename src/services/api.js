import axios from 'axios';
const api = axios.create({
  baseURL: 'http://localhost:8000/api', 
  timeout: 10000, // Si el backend de Python tarda más de 10 seg, corta la peticiion :v sabes wuaching
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;