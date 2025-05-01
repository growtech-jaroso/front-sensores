import { IndicatorStatus } from "../types/indicatorStatus";

export interface Plantation {
  _id: string;
  name: string;
  status?: IndicatorStatus;
  temperature?: number;
  humidity?: number;
  country: string;
  province: string;
  city: string;
  type: string;

  users?: string[];
  owner_id?: string;
  coordinates?: { lat: number; lng: number } | null;
  created_at?: string;
  updated_at?: string;

  //readings?: SensorReading[];
}
