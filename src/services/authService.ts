import axiosClient from "../api/axiosClient";

// Clave para el token en el almacenamiento de sesión
const TOKEN_KEY = 'auth_token';

export const authService = {

    // Métodode login para autenticarse con email y password
    login: async (email: string, password: string) => {
        try { 
            // Enviar una solicitud POST al endpoint de login
            const response = await axiosClient.post('/auth/login', {email, password});

            // Extraer el token del cuerpo de la respuesta
            const { token } = response.data;

            // Almacenar el token en el sessionStorage
            sessionStorage.setItem(TOKEN_KEY, token);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error :any) {
            // Si hay un error, obtener el mensaje de error o usar uno predeterminado
            const message = error.response?.data?.message || 'Error al hacer login';
            // Lanzar un error con el mensaje obtenido
            throw new Error(message);
        }
    },

    // Método de logout para cerrar sesión y eliminar el token de la sesión
    logout: () => {
        // Eliminar el token del sessionStorage
        sessionStorage.removeItem(TOKEN_KEY);
    },

    // Método para obtener el token almacenado en el sessionStorage
    getToken: () => {
        // Devolver el token almacenado o null si no existe
        return sessionStorage.getItem(TOKEN_KEY);
    },

    // Método para verificar si el usuario está autenticado
    isAuthenticated: () => {
        // Comprobar si el token existe en el sessionStorage
        return !!sessionStorage.getItem(TOKEN_KEY);
    },
}
