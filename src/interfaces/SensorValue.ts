export type MeasureTimespan = "AVG_1_MIN"

export interface SensorValue {
  id: string;
  value: number;
  reading_timestamp: string; 
  measure_timespan: MeasureTimespan;
  sensor_id: string;
}
