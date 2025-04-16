import React, { useState } from "react";
import { Eye } from "lucide-react";

type Plantation = {
  id: string;
  name: string;
  status: string;
  temperature: number;
  humidity: number;
  country: string;
  province: string;
  city: string;
  type: string;
};

type PlantationTableProps = {
  plantations: Plantation[];
  onVerSensor: (plantacion: Plantation) => void;
};

const getBadgeStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "activa":
      return "bg-green-600 text-white";
    case "inactiva":
      return "bg-gray-600 text-white";
    case "alerta":
      return "bg-red-600 text-white";
    default:
      return "bg-yellow-600 text-white";
  }
};

const PlantationTable: React.FC<PlantationTableProps> = ({ plantations, onVerSensor }) => {
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todas");
  const estadosDisponibles = ["Todas", "Activa", "Inactiva", "Alerta"];

  const filtered = plantations.filter((p) => {
    const matchesSearch = `${p.name} ${p.city} ${p.status} ${p.type} ${p.country}`.toLowerCase().includes(search.toLowerCase());
    const matchesEstado = estadoFiltro === "Todas" || p.status.toLowerCase() === estadoFiltro.toLowerCase();
    return matchesSearch && matchesEstado;
  });

  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h3 className="text-xl font-semibold text-green-600">🌱 Plantaciones</h3>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full md:w-80"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {estadosDisponibles.map((status) => (
          <button
            key={status}
            onClick={() => setEstadoFiltro(status)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
              estadoFiltro === status
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-800">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4">País</th>
              <th className="py-3 px-4">Provincia</th>
              <th className="py-3 px-4">Ciudad</th>
              <th className="py-3 px-4">Tipo</th>
              <th className="py-3 px-4 text-right">Sensor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getBadgeStyle(p.status)}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{p.country}</td>
                  <td className="py-3 px-4">{p.province}</td>
                  <td className="py-3 px-4">{p.city}</td>
                  <td className="py-3 px-4">{p.type}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onVerSensor(p)}
                      className="inline-flex items-center gap-1 cursor-pointer text-green-600 border border-green-600 hover:bg-green-600 hover:text-white px-3 py-1 rounded-full text-xs font-medium transition"
                    >
                      <Eye size={14} />
                      Ver Sensor
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlantationTable;
