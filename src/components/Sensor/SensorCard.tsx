import {Sensor} from "../../interfaces/Sensor.ts";
import {SensorType} from "../../types/sensorType.ts";
import {Droplets, HelpCircle, Thermometer, Zap} from "lucide-react";
import {SensorUnit} from "../../types/sensorUnit.ts";

interface Props {
  sensor: Sensor
  selectSensor: (sensor: Sensor) => void
  selected?: boolean
}

export default function SensorCard({sensor, selectSensor, selected = false}: Props) {

  const getIcon = (type: SensorType | null) => {
    switch (type) {
      case SensorType.AMBIENT_TEMPERATURE:
        return <Thermometer className="w-8 h-8 text-red-500" />;
      case SensorType.AMBIENT_HUMIDITY:
        return <Droplets className="w-8 h-8 text-blue-500" />;
      case SensorType.ATMOSPHERIC_PRESSURE:
        return <Zap className="w-8 h-8 text-purple-500" />;
      default:
        return <HelpCircle className="w-8 h-8 text-gray-400" />;
    }
  };

  // Function to get the label based on the sensor type
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
  }

  // Function to get the unit label based on the sensor unit
  const getUnitLabel = (unit: SensorUnit) => {
    switch (unit) {
      case SensorUnit.CELSIUS:
        return "°C";
      case SensorUnit.MBAR:
        return "mbars";
      case SensorUnit.PERCENTAGE:
        return "%";
      default:
        return "";
    }
  }

  return (
    <div
      onClick={() => selectSensor(sensor)}
      className={`
        cursor-pointer bg-white border border-gray-200 hover:border-green-500 rounded-2xl p-6 shadow-sm hover:shadow-xl transition
        ${selected && "border-green-500"}
      `}
    >
      <div className="flex items-center gap-4 mb-3">
        {getIcon(sensor.type)}
        <h3 className="text-lg font-semibold text-gray-800">{getTypeLabel(sensor.type)}</h3>
      </div>
      <p className="text-sm text-gray-500">
        Unidad de medida: <span className="font-medium">{getUnitLabel(sensor.unit)}</span>
      </p>
    </div>
  );
}