import {DeviceType} from "../types/deviceType.ts";

export interface Actuator {
  id: string;
  device_type: DeviceType;
  status: "ON" | "OFF";
  plantation_id: string;
}