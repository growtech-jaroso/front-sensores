import { z } from "zod";
import axiosClient from "../api/axiosClient";
import axios from "axios";

const USER_DATA_KEY = "user_data";

const loginSchema = z.object({
  email: z.string().email("Correo no válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

type UserData = {
  token: string;
  roles: string[];
  name: string;
  email: string;
};

export const authService = {
  login: async (email: string, password: string): Promise<void> => {
    try {
      loginSchema.parse({ email, password });

      const response = await axiosClient.post("/auth/login", { email, password });

      const { token, role, username, email: userEmail } = response.data.data;

      if (!token || !role) {
        throw new Error("Faltan datos en la respuesta del servidor.");
      }

      const userData: UserData = {
        token,
        roles: [role], // Asegura formato como array
        name: username,
        email: userEmail,
      };

      sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error("Hubo un problema al iniciar sesión. Verifica tus credenciales.");
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error desconocido al hacer login.");
      }
    }
  },

  logout: () => {
    sessionStorage.removeItem(USER_DATA_KEY);
    window.location.href = "/login";  // Redirigir al login después de cerrar sesión
  },

  getUserData: (): UserData | null => {
    try {
      const data = sessionStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) as UserData : null;
    } catch {
      return null;
    }
  },

  getToken: () => {
    return authService.getUserData()?.token || null;
  },

  isAuthenticated: () => {
    return !!authService.getToken();
  },
};
