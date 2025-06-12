import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plantation } from "../interfaces/Plantation.ts";
import { Sensor } from "../interfaces/Sensor.ts";
import { getPlantationById } from "../services/plantationService.ts";
import { getDevicesByPlantation } from "../services/sensorService.ts";
import SensorCard from "../components/Sensor/SensorCard.tsx";
import { Actuator } from "../interfaces/Actuator.ts";
import { DeviceType } from "../types/deviceType.ts";
import { IndicatorStatus, IndicatorStatusType } from "../types/indicatorStatus.ts";
import { useAuth } from "../hooks/useAuth";
import { AlertDelete } from "../components/Alert/AlertDelete.tsx";
import { deleteSensor } from "../services/sensorService.ts";
import SensorGraph from "../components/Sensor/SensorGraph.tsx";

type SensorAndActuators = {
  sensors: Sensor[];
  actuators: Actuator[];
};

export default function Sensors() {
  const { plantationId } = useParams();
  const [plantation, setPlantation] = useState<Plantation | null>(null);
  const [sensorsActuators, setSensorsActuators] = useState<SensorAndActuators>({ sensors: [], actuators: [] });
  const [error, setError] = useState<string | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const { role } = useAuth();

  const handleDeleteSensor = async (sensor: Sensor) => {
    if (!plantationId) return;

    const confirmed = await AlertDelete({
      title: "¿Eliminar sensor?",
      text: `¿Estás seguro de que quieres eliminar este sensor? Esta acción no se puede deshacer.`,
      confirmButtonText: "Sí, eliminar",
    });

    if (!confirmed) return;

    try {
      await deleteSensor(plantationId, sensor.id);

      setSensorsActuators((prev) => ({
        ...prev,
        sensors: prev.sensors.filter((s) => s.id !== sensor.id),
      }));

      if (selectedSensor && selectedSensor.id === sensor.id) {
        setSelectedSensor(null);
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("No se pudo eliminar el sensor.");
    }
  };

  useEffect(() => {
    if (!plantationId) return;
    getPlantationById(plantationId)
      .then(setPlantation)
      .catch(() => setError("No se pudo cargar la información de la plantación."));
    getDevicesByPlantation(plantationId)
      .then((devices) => {
        const sensors = devices.filter((device) => device.device_type === DeviceType.SENSOR) as Sensor[];
        const actuators = devices.filter((device) => device.device_type === DeviceType.ACTUATOR) as Actuator[];
        setSensorsActuators({ sensors, actuators });
      })
      .catch(() => setError("No se pudieron cargar los sensores."));
  }, [plantationId]);

  const selectSensor = (sensor: Sensor) => {
    setSelectedSensor(sensor);
  }

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
            <span className="text-green-600 font-medium">
              {IndicatorStatus[plantation.status as IndicatorStatusType]}
            </span>
          </p>
        </section>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">🔎 Sensores disponibles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorsActuators.sensors.length === 0 && <p>No hay sensores disponibles.</p>}
        {sensorsActuators.sensors.map((sensor) => (
          <SensorCard
            key={sensor.id}
            sensor={sensor}
            selectSensor={selectSensor}
            selected={selectedSensor?.id === sensor.id}
            userRole={role ?? undefined}
            onDelete={handleDeleteSensor}
          />
        ))}
      </div>
      {selectedSensor && <SensorGraph selectedSensor={selectedSensor} />}
    </div>
  );
}
