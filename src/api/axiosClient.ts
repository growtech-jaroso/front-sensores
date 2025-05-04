import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    const userData = sessionStorage.getItem("user_data");
    const token = userData ? JSON.parse(userData).token : null;
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";
    const isLoginRequest = requestUrl.includes("/auth/login");

    if (status === 401 && !isLoginRequest) {
      console.warn("Token inválido o expirado. Redirigiendo al login...");
      sessionStorage.removeItem("user_data");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
