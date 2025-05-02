import { useState } from "react";
import { Eye } from "lucide-react";
import { IndicatorStatus } from "../../types/indicatorStatus";
import type { Plantation } from "../../interfaces/Plantation";

type PlantationTableProps = {
  plantations: Plantation[];
  onVerSensor: (plantacion: Plantation) => void;
};

const getBadgeStyle = (status: IndicatorStatus) => {
  switch (status) {
    case IndicatorStatus.ACTIVE:
      return "bg-green-500/10 text-green-700 border border-green-500";
    case IndicatorStatus.INACTIVE:
      return "bg-gray-500/10 text-gray-700 border border-gray-500";
    case IndicatorStatus.ALERT:
      return "bg-red-500/10 text-red-700 border border-red-500";
    default:
      return "bg-yellow-500/10 text-yellow-700 border border-yellow-500";
  }
};

const statusLabels: Record<IndicatorStatus, string> = {
  [IndicatorStatus.TOTAL]: "Totales",
  [IndicatorStatus.ACTIVE]: "Activa",
  [IndicatorStatus.INACTIVE]: "Inactiva",
  [IndicatorStatus.ALERT]: "Alerta",
};

export default function PlantationTable({ plantations, onVerSensor }: PlantationTableProps) {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState(IndicatorStatus.TOTAL);

  const filtered = plantations.filter((p) => {
    const matchesSearch = `${p.name} ${p.city} ${p.status} ${p.type} ${p.country}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus = filterStatus === IndicatorStatus.TOTAL || p.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const isLoading = plantations.length === 0;

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
      {/* Header y búsqueda */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-green-700">🌱 Plantaciones</h2>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[IndicatorStatus.TOTAL, IndicatorStatus.ACTIVE, IndicatorStatus.INACTIVE, IndicatorStatus.ALERT].map(
          (status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1.5 text-sm font-medium rounded-full border transition ${
                filterStatus === status
                  ? "bg-green-600 text-white border-green-600 shadow-sm"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {statusLabels[status]}
            </button>
          )
        )}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-xs text-gray-600 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left hidden sm:table-cell">País</th>
              <th className="py-3 px-4 text-left hidden md:table-cell">Provincia</th>
              <th className="py-3 px-4 text-left hidden lg:table-cell">Ciudad</th>
              <th className="py-3 px-4 text-left hidden lg:table-cell">Tipo</th>
              <th className="py-3 px-4 text-center">Sensor</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <tr
                  key={i}
                  className="border-b border-gray-100 animate-fadeInSkeleton"
                  style={{ animationDelay: `${i * 0.1}s`, animationFillMode: "both" }}
                >
                  {Array(7)
                    .fill(null)
                    .map((_, j) => (
                      <td
                        key={j}
                        className={`py-3 px-4 ${
                          j >= 2 && j <= 5
                            ? j === 2
                              ? "hidden sm:table-cell"
                              : j === 3
                              ? "hidden md:table-cell"
                              : "hidden lg:table-cell"
                            : ""
                        }`}
                      >
                        <div className="h-4 bg-gray-200 rounded w-4/5" />
                      </td>
                    ))}
                </tr>
              ))
            ) : filtered.length > 0 ? (
              filtered.map((p, idx) => (
                <tr
                  key={p._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-100 hover:bg-green-50 transition-colors`}
                >
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getBadgeStyle(p.status ?? IndicatorStatus.TOTAL)}`}
                    >
                      {statusLabels[p.status as IndicatorStatus] || "Desconocido"}
                    </span>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">{p.country}</td>
                  <td className="py-3 px-4 hidden md:table-cell">{p.province}</td>
                  <td className="py-3 px-4 hidden lg:table-cell">{p.city}</td>
                  <td className="py-3 px-4 hidden lg:table-cell">{p.type}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onVerSensor(p)}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full text-white bg-green-600 hover:bg-green-700 transition-all"
                    >
                      <Eye size={14} className="opacity-80" />
                      Ver
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400 bg-white">
                  No se encontraron plantaciones.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Animación de entrada por fila */}
      <style>
        {`
          @keyframes fadeInSkeleton {
            0% {
              opacity: 0;
              transform: translateY(6px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fadeInSkeleton {
            animation: fadeInSkeleton 0.3s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
