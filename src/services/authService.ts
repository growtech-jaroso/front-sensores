import { z } from "zod";
import axiosClient from "../api/axiosClient";
import axios from "axios";
import {User} from "../interfaces/User.ts";

const USER_DATA_KEY = "user_data";

const loginSchema = z.object({
  email: z.string().email("Correo no válido"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export const authService = {
  login: async (email: string, password: string): Promise<void> => {
    try {
      loginSchema.parse({ email, password });

      const response = await axiosClient.post("/auth/login", { email, password });

      const { token, role, username, email: userEmail, id: userId } = response.data;

      if (!token || !role) {
        throw new Error("Faltan datos en la respuesta del servidor.");
      }

      const userData: User = {
        id: userId,
        token,
        role: role,
        username: username,
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

  getUserData: (): User | null => {
    try {
      const data = sessionStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) as User : null;
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
