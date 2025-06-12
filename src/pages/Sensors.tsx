import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Plantation } from "../interfaces/Plantation.ts";
import { Sensor } from "../interfaces/Sensor.ts";
import { getPlantationById } from "../services/plantationService.ts";
import { getDevicesByPlantation } from "../services/sensorService.ts";
import SensorCard from "../components/Sensor/SensorCard.tsx";
import { SensorValue } from "../interfaces/SensorValue.ts";
import axiosClient from "../api/axiosClient.ts";
import { Actuator } from "../interfaces/Actuator.ts";
import { DeviceType } from "../types/deviceType.ts";
import { IndicatorStatus, IndicatorStatusType } from "../types/indicatorStatus.ts";
import SensorDetail from "../components/Sensor/SensorDetails.tsx";
import ActuatorButton from "../components/Button/ActuatorButton.tsx";
import { useAuth } from "../hooks/useAuth";
import { AlertDelete } from "../components/Alert/AlertDelete.tsx";
import { deleteSensor } from "../services/sensorService.ts"; // asegúrate de que esté implementado

type SelectedSensorValues = {
  sensor: Sensor;
  values: SensorValue[];
};

type SensorAndActuators = {
  sensors: Sensor[];
  actuators: Actuator[];
};

export default function Sensors() {
  const { plantationId } = useParams();
  const [plantation, setPlantation] = useState<Plantation | null>(null);
  const [sensorsActuators, setSensorsActuators] = useState<SensorAndActuators>({ sensors: [], actuators: [] });
  const [error, setError] = useState<string | null>(null);
  const [selectedSensorValues, setSelectedSensorValues] = useState<SelectedSensorValues | null>(null);
  const { role } = useAuth();

  const getSensorValues = (sensor: Sensor) => {
    axiosClient
      .get(`/plantations/${plantationId}/sensors/${sensor.id}/values`)
      .then((response) => {
        setSelectedSensorValues({
          sensor,
          values: response.data.data,
        });
      })
      .catch(() => setError("No se pudieron cargar los valores de los sensores."));
  };

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

      if (selectedSensorValues?.sensor.id === sensor.id) {
        setSelectedSensorValues(null);
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

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded mb-6 border border-red-200 shadow-sm">⚠️ {error}</div>
      )}

      {plantation && (
        <>
          <section className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mb-10 flex justify-center gap-60 items-center">
            <div>
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
            </div>
            <div>
              <ActuatorButton actuator={sensorsActuators.actuators[0]}></ActuatorButton>
            </div>
          </section>
        </>
      )}

      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">🔎 Sensores disponibles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sensorsActuators.sensors.map((sensor) => (
          <SensorCard
            sensor={sensor}
            selectSensor={getSensorValues}
            key={sensor.id}
            selected={selectedSensorValues?.sensor.id === sensor.id}
            userRole={role ?? undefined}
            onDelete={handleDeleteSensor}
          />
        ))}
      </div>
      {selectedSensorValues && (
        <SensorDetail sensor={selectedSensorValues.sensor} values={selectedSensorValues.values} />
      )}
    </div>
  );
}
