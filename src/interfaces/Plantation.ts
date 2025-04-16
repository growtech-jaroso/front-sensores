export interface SensorReading {
  time: string; 
  temperature: number;
  humidity: number;
}

export interface Plantation {
  id: string;
  name: string;
  status: string;
  temperature: number;
  humidity: number;
  country: string;
  province: string;
  city: string;
  type: string;
  users?: string[];  

  readings?: SensorReading[];
}


