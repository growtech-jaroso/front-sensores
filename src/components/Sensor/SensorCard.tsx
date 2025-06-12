import { Sensor } from "../../interfaces/Sensor.ts";
import { SensorType } from "../../types/sensorType.ts";
import { SensorUnit } from "../../types/sensorUnit.ts";
import { UserRole } from "../../types/userRole.ts";

import { Droplets, HelpCircle, Thermometer, Zap, Trash2 } from "lucide-react";

interface Props {
  sensor: Sensor;
  selectSensor: (sensor: Sensor) => void;
  selected?: boolean;
  userRole?: UserRole;
  onDelete?: (sensor: Sensor) => void;
}

export default function SensorCard({ sensor, selectSensor, selected = false, userRole, onDelete }: Props) {
  const getIcon = (type: SensorType | null) => {
    switch (type) {
      case SensorType.AMBIENT_TEMPERATURE:
        return <Thermometer className="w-6 h-6 text-red-500" />;
      case SensorType.AMBIENT_HUMIDITY:
        return <Droplets className="w-6 h-6 text-blue-500" />;
      case SensorType.ATMOSPHERIC_PRESSURE:
        return <Zap className="w-6 h-6 text-purple-500" />;
      default:
        return <HelpCircle className="w-6 h-6 text-gray-400" />;
    }
  };

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
        return "mbar";
      case SensorUnit.PERCENTAGE:
        return "%";
      default:
        return "";
    }
  };

  return (
    <div
      onClick={() => selectSensor(sensor)}
      className={`
        relative cursor-pointer bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition
        ${selected ? "border-green-500" : "border-gray-200 hover:border-green-400"}
      `}
    >
      {/* Admin buttons */}
      {userRole === "ADMIN" && (
        <div className="absolute top-3 right-3 flex gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(sensor);
            }}
            className="p-1 hover:bg-gray-100 rounded"
            title="Eliminar"
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </button>
        </div>
      )}

      {/* Sensor content */}
      <div className="flex items-center gap-3 mb-2">
        {getIcon(sensor.type)}
        <h3 className="text-md font-semibold text-gray-800">{getTypeLabel(sensor.type)}</h3>
      </div>
      <p className="text-sm text-gray-500">
        Unidad de medida: <span className="font-medium">{getUnitLabel(sensor.unit)}</span>
      </p>
    </div>
  );
}
