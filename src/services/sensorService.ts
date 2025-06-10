import axiosClient from "../api/axiosClient";
import { Sensor } from "../interfaces/Sensor";

// Obtener sensores por ID de plantación
export const getSensorsByPlantation = async (plantationId: string): Promise<Sensor[]> => {
  const res = await axiosClient.get(`/plantations/${plantationId}/sensors`);
  return res.data?.data ?? [];
};

// Obtener lecturas de un sensor específico
export const getSensorValuesById = async (sensorId: string) => {
  const response = await axiosClient.get(`/sensors/${sensorId}/values`);
  return response.data.data as Sensor[];
};
