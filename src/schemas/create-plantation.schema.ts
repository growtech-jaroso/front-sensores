import { z } from "zod";

export const CreatePlantationSchema = z
  .object({
    name: z.string().min(3, "El nombre de la plantación es obligatorio y ten debe tener al menos 3 caracteres"),
    country: z.string().min(3, "El país es obligatorio y debe tener al menos 3 caracteres"),
    province: z.string().min(3, "La provincia es obligatoria y debe tener al menos 3 caracteres"),
    city: z.string().min(3, "La ciudad es obligatoria y debe tener al menos 3 caracteres"),
    description: z.string().optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    type: z.string().optional(),
    user_email: z.string().email("El correo electrónico del propietario es obligatorio"),
  })

export type CreatePlantationFormType = z.infer<typeof CreatePlantationSchema>;
