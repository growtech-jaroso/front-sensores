import { z } from "zod";

export const EditUserSchema = z
  .object({
    username: z.string().min(3, "El nombre de usuario es obligatorio"),
    email: z.string().email("El corrreo electrónico es obligatorio"),
    role: z.enum(["USER", "SUPPORT", "ADMIN"], {
      errorMap: () => ({ message: "Selecciona un rol válido" }),
    }),
    password: z.string().optional(),
    confirm_password: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const { password, confirm_password } = data;

    if (password || confirm_password) {
      if ((password || "").length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          minimum: 8,
          inclusive: true,
          type: "string",
          path: ["password"],
          message: "La nueva contraseña debe tener al menos 8 caracteres",
        });
      }

      if (password !== confirm_password) {
        ctx.addIssue({
          code: "custom",
          path: ["confirm_password"],
          message: "Las contraseñas no coinciden",
        });
      }
    }
  });

export type EditUserFormType = z.infer<typeof EditUserSchema>;
