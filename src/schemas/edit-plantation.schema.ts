import { z } from "zod";

export const EditPlantationSchema = z
  .object({
    name: z.string().min(3, "El nombre de la plantación es obligatorio"),
    type: z.string().min(3, "El tipo de la plantación es obligatorio"),
  })

export type EditPlantationFormType = z.infer<typeof EditPlantationSchema>;
