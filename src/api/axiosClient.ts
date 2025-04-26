import axios from "axios";

//---------------------------

// URL base para todas las peticiones 
const BASE_URL = "http://localhost:8080/api";

// Creación de una instancia de axios con la URL base y los headers por defecto
const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor para manejar errores globalmente (antes de enviar la request)
axiosClient.interceptors.response.use(
    (response) => {

        // Obtenemos el token de la respuesta
        const token = sessionStorage.getItem('auth_token');
        
        // Si el token existe, lo añadimos a los headers de la petición
        if (token) {
            response.headers.Authorization = `Bearer ${token}`;
        }

        // Si la respuesta fue bien, la devolvemos
        return response;
    },
    (error) => {
        // Si hay algun error antes de enviar la petición, lo rechazamos
        return Promise.reject(error);
    }
);

// Interceptor de respuestas (después de recibir cada response)
axiosClient.interceptors.response.use(
    (response) => {
      // Si la respuesta es exitosa, simplemente la devolvemos
      return response;
    },
    (error) => {
      // Si la respuesta es un error (por ejemplo 401 Unauthorized)
      if (error.response && error.response.status === 401) {
        console.error('No autorizado. Redirigiendo al login...');
  
        // Eliminamos el token del sessionStorage
        sessionStorage.removeItem('auth_token');
  
        // Redirigimos manualmente al login
        window.location.href = '/login';
      }
  
      // Rechazamos el error para manejarlo donde se haya hecho la llamada
      return Promise.reject(error);
    }
  );
      

export default axiosClient;