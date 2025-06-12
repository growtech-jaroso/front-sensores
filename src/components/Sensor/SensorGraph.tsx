import SensorDetail from "./SensorDetails.tsx";
import {Sensor} from "../../interfaces/Sensor.ts";
import {useEffect, useState} from "react";
import axiosClient from "../../api/axiosClient.ts";
import {SensorValue} from "../../interfaces/SensorValue.ts";
import {TimeFrame} from "../../interfaces/time-frames.ts";
import {defaultTimeFrames, getBeforeDate} from "../../utils/utils.ts";

interface Props {
  selectedSensor: Sensor
}

export default function SensorGraph({selectedSensor}: Props) {

  const [error, setError] = useState<string | null>(null)
  const [values, setValues] = useState<SensorValue[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [timeFrames, setTimeFrames] = useState<TimeFrame[]>(defaultTimeFrames);

  useEffect(() => {
    const getSensorValues = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await axiosClient.get(`/plantations/${selectedSensor.plantation_id}/sensors/${selectedSensor.id}/values`, {
          params: {
            before: getBeforeDate(timeFrames.find(frame => frame.selected)!)
          }
        });
        setValues(response.data.data)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError("No se pudieron cargar los valores de los sensores.")
      } finally {
        setIsLoading(false)
      }
    }

    getSensorValues()
  }, [selectedSensor, timeFrames])

  if (isLoading) {
    return <div className="text-center text-gray-500">Cargando...</div>;
  }

  return (
    <>
      {error && <div className="text-red-500 text-center">{error}</div>}
      <SensorDetail
        timeFrames={timeFrames}
        setSelectedTimeFrame={setTimeFrames}
        sensor={selectedSensor}
        values={values}
      />
    </>
  );
}