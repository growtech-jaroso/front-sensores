import { SensorType } from "../types/sensorType";
import { SensorUnit } from "../types/sensorUnit";
import { DeviceType } from "../types/deviceType";


export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Sensor {
  id: string;
  type: SensorType;
  device_type: DeviceType;
  unit: SensorUnit;
  plantation_id: string;
  threshold_min_alert?: number;
  threshold_max_alert?: number;
  coordinates: Coordinate[];
}
