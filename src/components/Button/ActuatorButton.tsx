import {useState} from "react";
import axiosClient from "../../api/axiosClient.ts";
import {Actuator} from "../../interfaces/Actuator.ts";

type Props = {
  actuator: Actuator
}

export default function ActuatorButton({ actuator }: Props) {
  const [loading, setLoading] = useState(false);
  const [currentStatus, setCurrentStatus] = useState<"ON" | "OFF">(actuator.status);

  const handleClick = async () => {
    setLoading(true);
    try {
      const newStatus = currentStatus === "OFF" ? "ON" : "OFF";
      const response = await axiosClient.put('/plantations/' + actuator.plantation_id + '/sensors/' + actuator.id + '/actuator/update', JSON.stringify({ status: newStatus }));
      if (response.data) {
        setCurrentStatus(newStatus);
      } else {
        console.error("Error al actualizar el estado del actuador):");
      }
    } catch (error) {
      console.error("Error de red:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      className={`px-4 py-2 rounded-lg shadow transition cursor-pointer ${
        currentStatus === "ON" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
      } text-white`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading
        ? "Cambiando..."
        : currentStatus === "ON"
          ? "Desactivar Riego"
          : "Activar Riego"}
    </button>
  );
}