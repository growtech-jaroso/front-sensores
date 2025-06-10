import { SensorType } from "../types/sensorType";
import { SensorUnit } from "../types/sensorUnit";
import { DeviceType } from "../types/deviceType";
import { ActuatorStatus } from "../types/actuatorStatus";


export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Sensor {
  id: string;
  type: SensorType | null;
  device_type: DeviceType;
  unit: SensorUnit | null;
  status?: ActuatorStatus;
  plantation_id: string;
  threshold_min_alert: number | null;
  threshold_max_alert: number | null;
  coordinates: Coordinate[];
}
