import React from "react";
import { Eye } from "lucide-react";

type Plantation = {
  id: string;
  nombre: string;
  ubicacion: string;
  estado: string;
  temperatura: number;
  humedad: number;
};

type PlantationTableProps = {
  plantations: Plantation[];
};

const getBadgeStyle = (estado: string) => {
  switch (estado.toLowerCase()) {
    case "activo":
      return "bg-green-500 text-white";
    case "inactivo":
      return "bg-gray-400 text-white";
    case "alerta":
      return "bg-red-600 text-white";
    default:
      return "bg-yellow-500 text-white";
  }
};

const PlantationTable: React.FC<PlantationTableProps> = ({ plantations }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-green-600 mb-4">🌱 Plantaciones Activas</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-900">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-600 border-b border-gray-300">
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Ubicación</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">Temperatura</th>
              <th className="py-3 px-4">Humedad</th>
              <th className="py-3 px-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {plantations.map((p) => (
              <tr
                key={p.id}
                className="group hover:bg-gray-50 transition-colors duration-200 rounded-lg"
              >
                <td className="py-3 px-4">{p.nombre}</td>
                <td className="py-3 px-4">{p.ubicacion}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${getBadgeStyle(
                      p.estado
                    )}`}
                  >
                    {p.estado}
                  </span>
                </td>
                <td className="py-3 px-4">{p.temperatura}°C</td>
                <td className="py-3 px-4">{p.humedad}%</td>
                <td className="py-3 px-4 text-right">
                  <button
                    title="Ver Sensor"
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors duration-300 transform hover:scale-105"
                  >
                    <Eye className="w-4 h-4 inline mr-2" />
                    Ver Sensor
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlantationTable;
