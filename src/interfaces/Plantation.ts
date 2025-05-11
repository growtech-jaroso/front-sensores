import { IndicatorStatus } from "../types/indicatorStatus";
import { IndicatorType } from "../types/indicatorTypes";

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Plantation {
  hasMap: boolean;
  id: string; 
  name: string;
  country: string;
  province: string;
  city: string;
  type: string;

  owner_id: string; 
  managers: string[]; // Lista de IDs de usuarios que gestionan la plantación

  coordinates?: Coordinate[]; // Lista de coordenadas 
  map_url?: string;

  created_at?: string;
  updated_at?: string;

  // Campos adicionales del frontend 
  status?: IndicatorStatus;
  statusType?: IndicatorType;
  temperature?: number;
  humidity?: number;

  // readings?: SensorReading[]; //  datos de sensores
}
