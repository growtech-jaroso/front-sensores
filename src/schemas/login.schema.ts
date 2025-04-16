import { z } from "zod";

export const LoginSchema = z.object({

  email: z
    .string({ required_error: "El correo electrónico es obligatorio" })
    .email({ message: "El correo electrónico debe ser válido" })
    .trim()
    .min(1, { message: "El correo electrónico es obligatorio" }),
  password: z
    .string({ required_error: "La contraseña es obligatoria" })
    .trim()
    .min(8, { message: "La contraseña debe tener al menos 8 caracteres" }),
});

export type LoginType = z.infer<typeof LoginSchema>;