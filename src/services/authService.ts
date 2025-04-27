import { z } from 'zod';
import axiosClient from "../api/axiosClient";
import { showAlert } from "../components/Alert/AlertService";

// Definimos el esquema de validación para el login con Zod
const loginSchema = z.object({
  email: z.string().email('No hay ninguna cuenta asociada a este correo'),
});

// Clave para el token en el almacenamiento de sesión
const TOKEN_KEY = 'auth_token';

export const authService = {
  login: async (email: string, password: string): Promise<void> => {
    try {
      // Validamos los datos de entrada con Zod antes de hacer la petición
      loginSchema.parse({ email, password });

      // Si la validación es exitosa, se procede a la solicitud al backend
      const response = await axiosClient.post<{ data: { token: string; username: string; email: string }; status: number; timestamp: string }>('/auth/login', { email, password });

      // Ver la respuesta completa en la consola (para depuración)
      console.log('Respuesta del backend:', response.data);

      // Acceder correctamente al token dentro de response.data.data.token
      const token = response.data.data.token;

      if (token) {
        // Almacenar el token en el sessionStorage si está presente
        sessionStorage.setItem(TOKEN_KEY, token);

        // Mostrar el SweetAlert2
        await showAlert('success', '¡Inicio de sesión exitoso!', 'Bienvenido ' + response.data.data.username, "Ir al dashboard");

        // Redirigir al usuario o realizar alguna acción adicional después de que el usuario acepte el mensaje
        window.location.href = '/dashboard';  
      } else {
        console.error('Token no encontrado en la respuesta del backend');
      }
    } catch (error: any) {
      console.error('Error en el login:', error);

      // En caso de error, muestra una alerta con el mensaje de error
      await showAlert('error', 'Error al iniciar sesión', 'Hubo un problema al intentar iniciar sesión. Intenta de nuevo.');

      // Lanzar un error con el mensaje obtenido
      throw new Error(error.response?.data?.message || 'Error al hacer login');
    }
  },

  logout: () => {
    // Eliminar el token del sessionStorage
    sessionStorage.removeItem(TOKEN_KEY);
  },

  getToken: () => {
    return sessionStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated: () => {
    return !!sessionStorage.getItem(TOKEN_KEY);
  },
};
