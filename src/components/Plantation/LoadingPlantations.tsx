import { useEffect, useState } from "react";
import { Plantation } from "../../interfaces/Plantation";

interface SimuladorProps {
  onDataReady: (data: Plantation[]) => void;
}

const SimuladorPlantaciones = ({ onDataReady }: SimuladorProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const mockData: Plantation[] = [
      {
        id: "1",
        name: "Finca Esperanza",
        status: "Activa",
        temperature: 28,
        humidity: 70,
        country: "Argentina",
        province: "Córdoba",
        city: "Villa María",
        type: "Frutas",
        users: ["user1"]
      },

      {
        id: "2",
        name: "Granja Verde",
        status: "Inactiva",
        temperature: 22,
        humidity: 60,
        country: "Argentina",
        province: "Buenos Aires",
        city: "La Plata",
        type: "Verduras",
        users: ["user2"]
      },
      {
        id: "3",
        name: "Huerto Urbano",
        status: "Alerta",
        temperature: 30,
        humidity: 80,
        country: "Argentina",
        province: "CABA",
        city: "Buenos Aires",
        type: "Frutas y Verduras",
        users: ["user3"]
      },

      {
        id: "4",
        name: "Huerto Rural",
        status: "Activa",
        temperature: 25,
        humidity: 70,
        country: "Argentina",
        province: "Buenos Aires",
        city: "San Luis",
        type: "Frutas y Verduras",
        users: ["user4"]
      },
      {
        id: "5",
        name: "Huerto Urbano",
        status: "Activa",
        temperature: 30,
        humidity: 80,
        country: "Argentina",
        province: "CABA",
        city: "Buenos Aires",
        type: "Frutas y Verduras",
        users: ["user5"]
      },
    ];

    setTimeout(() => {
      onDataReady(mockData);
      setLoading(false);
    }, 1500);
  }, [onDataReady]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center text-lg font-semibold text-gray-600 space-y-4">
        <svg
          className="animate-spin h-10 w-10 text-green-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <p className="text-xl animate-pulse">Cargando plantaciones...</p>
      </div>
    );
  }

  return null; 
};

export default SimuladorPlantaciones;
