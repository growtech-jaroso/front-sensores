import { Sensor } from "../../interfaces/Sensor";
import { SensorValue } from "../../interfaces/SensorValue";
import { SensorType } from "../../types/sensorType";
import { SensorUnit } from "../../types/sensorUnit";
import PlantationChart from "../Plantation/PlantationChart";

type Props = {
  sensor: Sensor;
  values?: SensorValue[];
};

export default function SensorDetail({ sensor, values = [] }: Props) {
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

  const chartData = values.map((entry) => ({
    id: entry.id,
    name: sensor.type,
    time: entry.reading_timestamp,
    value: entry.value,
  }));

  return (
    <div className="mt-10 bg-white border border-gray-100 rounded-2xl shadow p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📋 Información del sensor</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600 mb-6">
        <p>
          <strong>Tipo:</strong> {getTypeLabel(sensor.type)}
        </p>
        <p>
          <strong>Unidad:</strong> {getUnitLabel(sensor.unit)}
        </p>
      </div>

      {chartData.length > 0 ? (
        <PlantationChart
          data={chartData}
          type={sensor.type} // para saber qué línea pintar (temperatura, humedad, etc.)
        />
      ) : (
        <p className="text-gray-500 italic">Este sensor aún no tiene datos registrados.</p>
      )}
    </div>
  );
}
