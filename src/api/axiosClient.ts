import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// URL base para todas las peticiones
const BASE_URL = 'http://localhost:8080/api';

// Crear una instancia de axios
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitudes (antes de enviar)
axiosClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas (después de recibir)
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    const isLoginRequest = requestUrl.includes("/auth/login");

    if (status === 401 && !isLoginRequest) {
      console.warn("Token inválido o expirado. Redirigiendo al login...");
      sessionStorage.removeItem("auth_token");
      window.location.href = "/login"; 
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
