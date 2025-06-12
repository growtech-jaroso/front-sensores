import { Sensor } from "../../interfaces/Sensor";
import { SensorValue } from "../../interfaces/SensorValue";
import { SensorType } from "../../types/sensorType";
import { SensorUnit } from "../../types/sensorUnit";
import InputSelect from "../Inputs/InputSelect.tsx";
import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from "react";
import {TimeFrame} from "../../interfaces/time-frames.ts";
import SensorValuesChart from "./SensorValuesChart.tsx";

const getTypeLabel = (type: SensorType) => {
  switch (type) {
    case SensorType.ATMOSPHERIC_PRESSURE:
      return "Presión atmosférica";
    case SensorType.AMBIENT_TEMPERATURE:
      return "Temperatura ambiental";
    case SensorType.AMBIENT_HUMIDITY:
      return "Humedad ambiental";
    default:
      return "Sensor desconocido";
  }
};

const getUnitLabel = (unit: SensorUnit) => {
  switch (unit) {
    case SensorUnit.CELSIUS:
      return "°C";
    case SensorUnit.MBAR:
      return "mbars";
    case SensorUnit.PERCENTAGE:
      return "%";
    default:
      return "-";
  }
};

interface ChartData {
  id: string;
  name: string;
  time: string;
  value: number;
}

type Props = {
  sensor: Sensor;
  values?: SensorValue[];
  timeFrames: TimeFrame[];
  setSelectedTimeFrame: Dispatch<SetStateAction<TimeFrame[]>>
};

export default function SensorDetail({ sensor, values = [], timeFrames, setSelectedTimeFrame }: Props) {

  const [chartData, setChartData] = useState<ChartData[]>([]);

  const handleTimeFrameChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    const updatedTimeFrames = timeFrames.map(option => ({
      ...option,
      selected: option.value === selectedValue
    }));

    setSelectedTimeFrame(updatedTimeFrames);
  }

  useEffect(() => {
    const chartData = values.map((entry) => ({
      id: entry.id,
      name: sensor.type,
      time: new Date(new Date(entry.reading_timestamp).getTime() + 1000 * 60 * 60 * 2).toISOString(), // Ajuste para UTC+2 (España)
      value: entry.value,
    }));

    setChartData(chartData)
  }, [values]);

  return (
    <div className="mt-10 bg-white border border-gray-100 rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Información del sensor</h2>

      <div className="grid justify-items-center grid-cols-1 sm:grid-cols-3 items-center gap-4 text-sm text-gray-600 mb-6">
        <p>
          <strong>Tipo:</strong> {getTypeLabel(sensor.type)}
        </p>
        <p>
          <strong>Unidad:</strong> {getUnitLabel(sensor.unit)}
        </p>
        <div className="flex gap-2 items-center">
          <strong>Tramo:</strong>
          <InputSelect
            options={timeFrames}
            onChange={handleTimeFrameChange}
          />
        </div>
      </div>

      {chartData.length > 0 ? (
        <SensorValuesChart
          data={chartData}
          type={sensor.type} // para saber qué línea pintar (temperatura, humedad, etc.)
        />
      ) : (
        <p className="text-gray-500 italic">Este sensor aún no tiene datos registrados.</p>
      )}
    </div>
  );
}
