import axios from "axios";
import { Sensor } from "../interfaces/Sensor";

// Obtener sensores por ID de plantación
export const getSensorsByPlantation = async (plantationId: string, page = 1, limit = 10): Promise<Sensor[]> => {
  const res = await axios.get(`/plantations/${plantationId}/sensors?page=${page}&limit=${limit}`);
  return res.data?.data ?? [];
};

// Obtener lecturas de un sensor específico
export const getSensorValuesById = async (sensorId: string) => {
  const response = await axios.get(`/sensors/${sensorId}/values`);
  return response.data;
};
