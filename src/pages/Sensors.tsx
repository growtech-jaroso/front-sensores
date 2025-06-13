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
import ActuatorButton from "../components/Button/ActuatorButton.tsx";
import { useAuth } from "../hooks/useAuth";
import { AlertDelete } from "../components/Alert/AlertDelete.tsx";
import SensorGraph from "../components/Sensor/SensorGraph.tsx";
import { deleteSensor } from "../services/sensorService.ts";
import { Droplet, Leaf, MapPin } from "lucide-react";
import GoBackButton from "../components/Button/GoBackButton.tsx";
import WateringProgressBar from "../components/DashboardWidgets/WateringProgressBar.tsx";

type SensorAndActuators = {
  sensors: Sensor[];
  actuators: Actuator[];
};

export default function Sensors() {
  const { plantationId } = useParams();
  const [plantation, setPlantation] = useState<Plantation | null>(null);
  const [sensorsActuators, setSensorsActuators] = useState<SensorAndActuators>({sensors: [], actuators: []});
  const [error, setError] = useState<string | null>(null);
  const [selectedSensor, setSelectedSensor] = useState<Sensor | null>(null);
  const { role } = useAuth();

  const changeActuatorStatus = (status: "ON" | "OFF") => {
    if (sensorsActuators.actuators.length === 0) return;

    const updatedActuator = {
      ...sensorsActuators.actuators[0],
      status,
    };

    setSensorsActuators((prev) => ({
      ...prev,
      actuators: [updatedActuator],
    }));
  }

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
        <section className="relative bg-gradient-to-br from-[#f8fefc] via-white to-[#f0fbf6] p-8 rounded-3xl shadow-xl border border-gray-100 mb-10 overflow-hidden">

          <GoBackButton className="mb-3 md:-mb-2" />
          {/* Contenido principal */}
          <div className="relative flex flex-col md:flex-row justify-evenly items-center gap-10">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold text-green-700 flex items-center justify-center md:justify-start gap-2">
                <Leaf className="w-7 h-7 text-green-600" />
                {plantation.name}
              </h1>

              <div className="flex items-center justify-center md:justify-start gap-2 text-gray-600 text-base md:text-lg">
                <MapPin className="w-5 h-5 text-red-500" />
                {plantation.city}, {plantation.province}, {plantation.country}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-center md:justify-start gap-2 text-sm text-gray-500">
                <span>
                  Cultivo: <span className="font-semibold text-gray-700">{plantation.type}</span>
                </span>
                <span className="hidden sm:inline">•</span>
                <span className="flex items-center gap-1">
                  Estado:{" "}
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-0.5 rounded-full text-xs font-semibold shadow-sm 
                    ${plantation.status === "ONLINE" && "bg-green-100 text-green-700"}
                    ${plantation.status === "OFFLINE" && "bg-red-100 text-red-700"}
                   `}
                  >
                    <span className="w-2 h-2 rounded-full bg-current"></span>
                    {IndicatorStatus[plantation.status as IndicatorStatusType]}
                  </span>
                </span>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="bg-white border border-gray-200 shadow-lg rounded-2xl px-6 py-5 w-full sm:w-80 text-center space-y-4 hover:shadow-xl transition-shadow">
                <div className="flex justify-center">
                  <div className="bg-green-100 p-2 rounded-full mb-1">
                    <Droplet className="w-5 h-5 text-green-700" />
                  </div>
                </div>
                <h3 className="text-md font-semibold text-gray-800">Control de riego</h3>
                <p className="text-sm text-gray-500 leading-snug px-1">
                  Gestiona el sistema de riego para esta plantación en tiempo real.
                </p>
                {sensorsActuators.actuators.length > 0 && <ActuatorButton actuator={sensorsActuators.actuators[0]} changeStatus={changeActuatorStatus} />}
              </div>
            </div>
          </div>
          <div className={'mt-6'}>
            <WateringProgressBar
              isIrrigating={sensorsActuators.actuators.length > 0 && sensorsActuators.actuators[0].status === "ON"}
            />
          </div>
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
