import axios, { AxiosInstance,AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitudes: añade el token si existe
axiosClient.interceptors.request.use(
  (config) => {
    const userData = sessionStorage.getItem("user_data");
    const token = userData ? JSON.parse(userData).token : null;

    if (token) {
      config.headers!["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor de respuestas: maneja errores como token expirado
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
  const status = error.response?.status;
  const requestUrl = error.config?.url || "";

  const isLoginRequest = requestUrl.includes("/auth/login");
  const isUserCreation = requestUrl.includes("/users");

  if (status === 401 && !isLoginRequest && !isUserCreation) {
  const message = error.response?.data?.message || "";

  const isAuthError = message.toLowerCase().includes("token") || message.toLowerCase().includes("autorización");

  if (isAuthError) {
  console.warn("Token inválido o expirado. Redirigiendo al login...");
  sessionStorage.removeItem("user_data");
  window.location.href = "/login";
  }
}

  return Promise.reject(error);
}
);

export default axiosClient;
