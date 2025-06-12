import { z } from "zod";
import {SensorType} from "../types/sensorType.ts";
import {SensorUnit} from "../types/sensorUnit.ts";

export const CreateDeviceShema = z
  .object({
    sensor_type: z.enum([SensorType.AMBIENT_HUMIDITY, SensorType.AMBIENT_TEMPERATURE, SensorType.ATMOSPHERIC_PRESSURE],
      {message: "Selecciona un tipo de sensor válido"}),
    sensor_unit: z.enum([SensorUnit.CELSIUS, SensorUnit.PERCENTAGE, SensorUnit.MBAR],
      {message: "Selecciona una unidad de medida válida"}),
  })

export type CreateDeviceFormType = z.infer<typeof CreateDeviceShema>;
