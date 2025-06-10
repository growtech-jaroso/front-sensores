import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Plantation } from "../../interfaces/Plantation";
import { Sensor } from "../../interfaces/Sensor";
import { Thermometer, Droplets, Zap, HelpCircle } from "lucide-react";
import { SensorType } from "../../types/sensorType";
import { getPlantationById } from "../../services/plantationService";
import { getSensorsByPlantation } from "../../services/sensorService";

export default function PlantationSensorsView() {
  const { plantationId } = useParams();
  const navigate = useNavigate();
  const [plantation, setPlantation] = useState<Plantation | null>(null);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plantationId) return;
    getPlantationById(plantationId)
      .then(setPlantation)
      .catch(() => setError("No se pudo cargar la información de la plantación."));
    getSensorsByPlantation(plantationId)
      .then(setSensors)
      .catch(() => setError("No se pudieron cargar los sensores."));
  }, [plantationId]);

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

  console.log(sensors);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-6 border border-red-200 shadow-sm">⚠️ {error}</div>
      )}

      {plantation && (
        <section className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mb-10">
          <h1 className="text-4xl font-extrabold text-green-700 mb-2">🌿 {plantation.name}</h1>
          <p className="text-gray-600 text-lg mb-1">
            📍 {plantation.city}, {plantation.province}, {plantation.country}
          </p>
          <p className="text-sm text-gray-500">
            Cultivo: <strong>{plantation.type}</strong> — Estado:{" "}
            <span className="text-green-600 font-medium">{plantation.status}</span>
          </p>
        </section>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">🔎 Sensores disponibles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensors.map((sensor) => (
          <div
            key={sensor.id}
            onClick={() => navigate(`/dashboard/sensor/${sensor.id}`)}
            className="cursor-pointer bg-white border border-gray-200 hover:border-green-500 rounded-2xl p-6 shadow-sm hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4 mb-3">
              {getIcon(sensor.type)}
              <h3 className="text-lg font-semibold text-gray-800">{sensor.type}</h3>
            </div>
            <p className="text-sm text-gray-500">
              Unidad de medida: <span className="font-medium">{sensor.unit}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
