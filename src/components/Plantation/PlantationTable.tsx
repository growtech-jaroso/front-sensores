import React, { useState } from "react";
import { Eye, ChevronDown, ChevronUp } from "lucide-react";

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
    case "activa":
      return "bg-green-600 text-white";
    case "inactiva":
      return "bg-gray-500 text-white";
    case "alerta":
      return "bg-red-600 text-white";
    default:
      return "bg-yellow-600 text-white";
  }
};

const estadosDisponibles = ["Todos", "Activa", "Inactiva", "Alerta"];

type SortKey = "temperatura" | "humedad" | "";

const PlantationTable: React.FC<PlantationTableProps> = ({ plantations }) => {
  const [search, setSearch] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("Todos");
  const [sortKey, setSortKey] = useState<SortKey>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const filteredPlantations = plantations
    .filter((p) => {
      const matchesSearch =
        `${p.nombre} ${p.ubicacion} ${p.estado}`.toLowerCase().includes(search.toLowerCase());

      const matchesEstado =
        estadoFiltro === "Todos" || p.estado.toLowerCase() === estadoFiltro.toLowerCase();

      return matchesSearch && matchesEstado;
    })
    .sort((a, b) => {
      if (!sortKey) return 0;
      const valA = a[sortKey];
      const valB = b[sortKey];
      return sortDirection === "asc" ? valA - valB : valB - valA;
    });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <h3 className="text-xl font-bold text-green-600">🌿 Plantaciones</h3>
        <input
          type="text"
          placeholder="Buscar plantación..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full md:w-80"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {estadosDisponibles.map((estado) => (
          <button
            key={estado}
            onClick={() => setEstadoFiltro(estado)}
            className={`px-3 py-1 rounded-full text-sm font-medium border transition ${
              estadoFiltro === estado
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {estado}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-800">
          <thead>
            <tr className="text-left text-xs font-semibold text-gray-500 border-b border-gray-200">
              <th className="py-3 px-4">Nombre</th>
              <th className="py-3 px-4">Ubicación</th>
              <th className="py-3 px-4">Estado</th>
              <th className="py-3 px-4 cursor-pointer select-none" onClick={() => handleSort("temperatura")}>
                <div className="flex items-center gap-1">
                  Temperatura
                  {sortKey === "temperatura" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer select-none" onClick={() => handleSort("humedad")}>
                <div className="flex items-center gap-1">
                  Humedad
                  {sortKey === "humedad" &&
                    (sortDirection === "asc" ? (
                      <ChevronUp size={14} />
                    ) : (
                      <ChevronDown size={14} />
                    ))}
                </div>
              </th>
              <th className="py-3 px-4 text-right">Sensor</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlantations.length > 0 ? (
              filteredPlantations.map((p, index) => (
                <tr
                  key={p.id}
                  className={`transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
                >
                  <td className="py-3 px-4">{p.nombre}</td>
                  <td className="py-3 px-4">{p.ubicacion}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-semibold ${getBadgeStyle(p.estado)}`}>
                      {p.estado}
                    </span>
                  </td>
                  <td className="py-3 px-4">{p.temperatura}°C</td>
                  <td className="py-3 px-4">{p.humedad}%</td>
                  <td className="py-3 px-4 text-right">
                    <button className="inline-flex items-center gap-1 cursor-pointer text-green-600 border border-green-600 hover:bg-green-600 hover:text-white px-3 py-1 rounded-full text-xs font-medium transition">
                      <Eye size={14} />
                      Ver Sensor
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
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
