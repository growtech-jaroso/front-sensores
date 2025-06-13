import {useState} from "react";
import axiosClient from "../../api/axiosClient.ts";
import {Actuator} from "../../interfaces/Actuator.ts";

type Props = {
  actuator: Actuator
  changeStatus: (status: "ON" | "OFF") => void
}

export default function ActuatorButton({ actuator, changeStatus }: Props) {
  const [loading, setLoading] = useState(false);


  const handleClick = async () => {
    setLoading(true);
    try {
      const newStatus = actuator.status === "OFF" ? "ON" : "OFF";
      const response = await axiosClient.put('/plantations/' + actuator.plantation_id + '/sensors/' + actuator.id + '/actuator/update', JSON.stringify({ status: newStatus }));
      if (response.data) {
        changeStatus(newStatus);
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
        actuator.status === "ON" ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
      } text-white`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading
        ? "Cambiando..."
        : actuator.status === "ON"
          ? "Desactivar Riego"
          : "Activar Riego"}
    </button>
  );
}