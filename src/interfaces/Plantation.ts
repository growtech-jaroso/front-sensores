import { IndicatorStatus } from "../types/indicatorStatus";
import { IndicatorType } from "../types/indicatorTypes";

export interface Plantation {
  id: string;
  name: string;
  status?: IndicatorStatus;
  statusType?: IndicatorType;
  temperature?: number;
  humidity?: number;
  country: string;
  province: string;
  map_url?: string;
  city: string;
  type: string;

  users?: string[];
  owner_id?: string;
  coordinates?: { lat: number; lng: number } | null;
  created_at?: string;
  updated_at?: string;

  //readings?: SensorReading[];
}
