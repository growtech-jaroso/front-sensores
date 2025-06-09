export type MeasureTimespan = "ONE_HOUR" | "THIRTY_MINUTES" | "FIFTEEN_MINUTES"; // según tus enums

export interface SensorValue {
  id: string;
  value: number;
  reading_timestamp: string; 
  measure_timespan: MeasureTimespan;
  sensor_id: string;
}
