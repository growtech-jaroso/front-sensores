import { z } from "zod";

export const CreatePlantationSchema = z
  .object({
    old_password: z.string().min(8, "La antigua contraseña debe tener al menos 8 caracteres"),
    new_password: z.string().min(8, "La nueva contraseña debe tener al menos 8 caracteres"),
    confirm_password: z.string().min(8, "La confirmación de la contraseña debe tener al menos 8 caracteres"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    path: ["confirm_password"],
    message: "La nueva contraseña y la confirmación no coinciden",
  });

export type CreatePlantationFormType = z.infer<typeof CreatePlantationSchema>;
