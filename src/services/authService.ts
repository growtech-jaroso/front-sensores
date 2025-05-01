import { z } from "zod";
import axiosClient from "../api/axiosClient";
import axios from "axios";

const USER_DATA_KEY = "user_data";

const loginSchema = z.object({
  email: z.string().email("Correo no válido"),
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
      loginSchema.parse({ email });

      const response = await axiosClient.post("/auth/login", { email, password });
      const { token, roles, username, email: userEmail } = response.data.data;

      if (!token || !roles) {
        throw new Error("Faltan datos en la respuesta.");
      }

      const userData: UserData = {
        token,
        roles,
        name: username,
        email: userEmail,
      };

      sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        throw new Error("Hubo un problema al iniciar sesión. Revisa tus credenciales.");
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error desconocido al hacer login.");
      }
    }
  },

  logout: () => {
    sessionStorage.removeItem(USER_DATA_KEY);
  },

  getUserData: (): UserData | null => {
    try {
      const data = sessionStorage.getItem(USER_DATA_KEY);
      return data ? JSON.parse(data) as UserData : null;
    } catch {
      return null;
    }
  },

  getToken: () => authService.getUserData()?.token || null,
  isAuthenticated: () => !!authService.getToken(),
};
