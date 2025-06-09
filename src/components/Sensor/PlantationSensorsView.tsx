import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PlantationChart from "../Plantation/PlantationChart";
import { Plantation } from "../../interfaces/Plantation";
import { Sensor } from "../../interfaces/Sensor";
import { SensorType } from "../../types/sensorType";

// Lectura combinada que espera el gráfico
type Reading = {
  id: string;
  name: string;
  time: string;
  temperature: number;
  humidity: number;
};

// Lo que devuelve cada sensor individualmente
type SensorValue = {
  id: string;
  value: number;
  reading_timestamp: string;
  sensor_id: string;
};

export default function PlantationSensorsView() {
  const { id } = useParams();
  const [plantation, setPlantation] = useState<Plantation | null>(null);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [readings, setReadings] = useState<Reading[]>([]);

  // Cargar info de la plantación
  useEffect(() => {
    axios
      .get(`/api/plantaciones/${id}`)
      .then((res) => setPlantation(res.data.data))
      .catch((err) => console.error("Error al cargar la plantación", err));
  }, [id]);

  // Cargar sensores de la plantación
  useEffect(() => {
    axios
      .get(`/api/plantaciones/${id}/sensores`)
      .then((res) => setSensors(res.data.data))
      .catch((err) => console.error("Error al cargar sensores", err));
  }, [id]);

  // Cargar lecturas de TEMP y HUM y combinarlas
  useEffect(() => {
    if (sensors.length === 0) return;

    const tempSensor = sensors.find((s) => s.type === SensorType.TEMPERATURE);
    const humSensor = sensors.find((s) => s.type === SensorType.HUMIDITY);

    if (!tempSensor || !humSensor) return;

    Promise.all([
      axios.get(`/api/sensores/${tempSensor.id}/lecturas`),
      axios.get(`/api/sensores/${humSensor.id}/lecturas`),
    ])
      .then(([tempRes, humRes]) => {
        const tempValues: SensorValue[] = tempRes.data;
        const humValues: SensorValue[] = humRes.data;

        const merged = mergeSensorValues(tempValues, humValues);
        setReadings(merged);
      })
      .catch((err) => console.error("Error al cargar lecturas", err));
  }, [sensors]);

  return (
    <div className="p-6">
      {plantation && (
        <div className="bg-white p-4 rounded-lg shadow mb-6 border border-gray-200">
          <h3 className="text-xl font-semibold text-green-700">{plantation.name}</h3>
          <p className="text-gray-600">
            📍 {plantation.city}, {plantation.province}, {plantation.country}
          </p>
          <p className="text-gray-500">
            🌿 Cultivo: {plantation.type} | Estado: {plantation.status}
          </p>
        </div>
      )}

      {readings.length > 0 ? (
        <PlantationChart data={readings} />
      ) : (
        <p className="text-gray-500">Cargando datos combinados...</p>
      )}
    </div>
  );
}

// Combinar lecturas TEMP + HUM por timestamp
function mergeSensorValues(temp: SensorValue[], hum: SensorValue[]): Reading[] {
  const map = new Map<string, Partial<Reading>>();

  for (const t of temp) {
    const key = t.reading_timestamp;
    if (!map.has(key)) map.set(key, {});
    map.get(key)!.temperature = t.value;
    map.get(key)!.time = key;
    map.get(key)!.id = t.id;
  }

  for (const h of hum) {
    const key = h.reading_timestamp;
    if (!map.has(key)) map.set(key, {});
    map.get(key)!.humidity = h.value;
    map.get(key)!.time = key;
    map.get(key)!.id = h.id;
  }

  return Array.from(map.values()).map((r) => ({
    id: r.id!,
    name: "Combinado",
    time: r.time!,
    temperature: r.temperature ?? 0,
    humidity: r.humidity ?? 0,
  }));
}
