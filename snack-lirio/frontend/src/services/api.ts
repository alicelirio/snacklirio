import axios from "axios";

// Usa variável de ambiente em produção (Vercel) e localhost como fallback
const baseURL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:3000';
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
