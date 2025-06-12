import {Navigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosClient from "../../api/axiosClient.ts";
import {Plantation} from "../../interfaces/Plantation.ts";
import Layout from "../../layout/Layout.tsx";
import GoBackButton from "../../components/Button/GoBackButton.tsx";
import {DeviceType} from "../../types/deviceType.ts";
import InputSelect from "../../components/Inputs/InputSelect.tsx";
import SensorForm from "../../components/Admin/devices/SensorForm.tsx";
import ActuatorForm from "../../components/Admin/devices/ActuatorForm.tsx";

export default function CreateDevice() {

  const {plantationId} = useParams()


  const [selectedDeviceType, setSelectedDeviceType] = useState<DeviceType>(DeviceType.SENSOR);

  const [plantation, setPlantation] = useState<Plantation | null>(null);

  useEffect(() => {
    axiosClient.get(`/plantations/${plantationId}`)
        .then(res => {
          setPlantation(res.data.data);
        })
  }, []);

  if (!plantationId) return (<Navigate to="/admin" />)

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md animate-fadeIn">
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
          `}
        </style>

        <GoBackButton />

        <h2 className="text-2xl font-bold text-green-700 mb-6">👤 Crear nuevo device para la plantación {plantation?.name}</h2>

        <InputSelect
          label="Seleccione el tipo de dispositivo"
          options={[
            { value: DeviceType.SENSOR, label: "Sensor" },
            { value: DeviceType.ACTUATOR, label: "Actuador" },
          ]}
          onChange={(e) => setSelectedDeviceType(e.target.value as DeviceType)}

        />
        {
          selectedDeviceType === DeviceType.SENSOR
          ? (<SensorForm plantationId={plantationId} />)
          : (<ActuatorForm plantationId={plantationId} />)
        }
      </div>
    </Layout>
  )
}