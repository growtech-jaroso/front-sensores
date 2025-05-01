import { z } from "zod";
import axiosClient from "../api/axiosClient";
import axios from "axios";

const loginSchema = z.object({
  email: z.string().email("No hay ninguna cuenta asociada a este correo"),
});

const TOKEN_KEY = "auth_token";

export const authService = {
  login: async (email: string, password: string): Promise<void> => {
    try {
      loginSchema.parse({ email });

      const response = await axiosClient.post("/auth/login", { email, password });
      const token = response.data.data.token;

      if (!token) {
        throw new Error("Token no encontrado");
      }

      sessionStorage.setItem("auth_token", token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const msg =  "Hubo un problema al iniciar sesión comprube sus credenciales";
        throw new Error(msg);
      } else if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error("Error desconocido en login.");
      }
    }
  },

  logout: () => sessionStorage.removeItem(TOKEN_KEY),
  getToken: () => sessionStorage.getItem(TOKEN_KEY),
  isAuthenticated: () => !!sessionStorage.getItem(TOKEN_KEY),
};
