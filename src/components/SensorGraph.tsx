import SensorDetail from "./Sensor/SensorDetails.tsx";
import {Sensor} from "../interfaces/Sensor.ts";
import {useEffect} from "react";
import axiosClient from "../api/axiosClient.ts";

interface Props {
  selectedSensor: Sensor
}

export default function SensorGraph({selectedSensor}: Props) {

  useEffect(() => {
    axiosClient
      .get(`/plantations/${plantationId}/sensors/${sensor.id}/values`)
      .then((response) => {
        setSelectedSensorValues({
          sensor,
          values: response.data.data,
        });
      })
      .catch(() => setError("No se pudieron cargar los valores de los sensores."));
  }, [selectedSensor])

  return (
    <div>
      <SensorDetail sensor={selectedSensorValues.sensor} values={selectedSensorValues.values} />
    </div>
  );
}