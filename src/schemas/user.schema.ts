import { z } from "zod";

export const UserSchema = z
  .object({
    username: z.string().min(3, "El nombre de usuario es obligatorio"),
    email: z.string().email("El corrreo electrónico es obligatorio"),
    password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
    confirm_password: z.string(),
    role: z.enum(["USER", "SUPPORT", "ADMIN"], {
      errorMap: () => ({ message: "Selecciona un rol válido" }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Las contraseñas no coinciden",
  });

export type UserFormType = z.infer<typeof UserSchema>;
