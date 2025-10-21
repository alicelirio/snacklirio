import axios from "axios";

// Forçando localhost durante desenvolvimento
const baseURL = 'http://localhost:3000';
const api = axios.create({ baseURL });

// Interceptor para adicionar o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("snacklirio:token");

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
