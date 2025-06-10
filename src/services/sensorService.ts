import axiosClient from "../api/axiosClient";
import { Sensor } from "../interfaces/Sensor";
import {DeviceType} from "../types/deviceType.ts";

type Device = {
  device_type: DeviceType;
}

// Obtener devices por ID de plantación
export const getDevicesByPlantation = async (plantationId: string): Promise<Device[]> => {
  const res = await axiosClient.get(`/plantations/${plantationId}/sensors`);
  return res.data?.data as Device[];
};

// Obtener lecturas de un sensor específico
export const getSensorValuesById = async (sensorId: string) => {
  const response = await axiosClient.get(`/sensors/${sensorId}/values`);
  return response.data.data as Sensor[];
};
