import { z } from "zod";

export const ManageManagersSchema = z
  .object({
    manager_email: z.string().email("El correo electrónico debe ser válido"),
  })

export type ManageManagersFormType = z.infer<typeof ManageManagersSchema>;
