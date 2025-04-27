import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// URL base para todas las peticiones
const BASE_URL = 'http://localhost:8080/api';

// Crear una instancia de axios con la URL base y los headers por defecto
const axiosClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor de solicitudes (antes de que se envíen)
axiosClient.interceptors.request.use(
  (config) => {
    // Obtener el token del sessionStorage
    const token = sessionStorage.getItem('auth_token');

    // Si el token existe, lo añadimos a los headers de la solicitud
    if (token) {
      config.headers!['Authorization'] = `Bearer ${token}`;
    }

    // Devolver la configuración de la solicitud
    return config;
  },
  (error: AxiosError) => {
    // Si hay algún error antes de enviar la solicitud, lo rechazamos
    return Promise.reject(error);
  }
);

// Interceptor de respuestas (después de recibir la respuesta)
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Si la respuesta es exitosa, la devolvemos tal cual
    return response;
  },
  (error: AxiosError) => {
    // Si la respuesta es un error 401 (No autorizado)
    if (error.response && error.response.status === 401) {
      console.error('No autorizado. Redirigiendo al login...');

      // Eliminar el token del sessionStorage
      sessionStorage.removeItem('auth_token');

      // Redirigir al login
      window.location.href = '/login';
    }

    // Si hay otros errores, los devolvemos
    return Promise.reject(error);
  }
);

export default axiosClient;
