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

const PlantationTable = ({ plantations, onVerSensor }: PlantationTableProps) => {
  const [search, setSearch] = useState("");
  const [filterStatus, setEstadoFiltro] = useState(IndicatorStatus.TOTAL);

  const availableStates = [
    IndicatorStatus.TOTAL,
    IndicatorStatus.ACTIVE,
    IndicatorStatus.INACTIVE,
    IndicatorStatus.ALERT,
  ];

  const filtered = plantations.filter((p) => {
    const matchesSearch = `${p.name} ${p.city} ${p.status} ${p.type} ${p.country}`
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesEstado =
      filterStatus === IndicatorStatus.TOTAL || p.status === filterStatus;

    return matchesSearch && matchesEstado;
  });

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h3 className="text-2xl font-semibold text-green-700">🌱 Plantaciones</h3>
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-green-400 w-full md:w-80"
        />
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-6">
        {availableStates.map((status) => (
          <button
            key={status}
            onClick={() => setEstadoFiltro(status)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              filterStatus === status
                ? "bg-green-600 text-white border-green-600 shadow-sm"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {statusLabels[status]}
          </button>
        ))}
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="w-full text-sm text-gray-800 table-fixed">
          <thead className="bg-gray-100 text-xs text-gray-600 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">País</th>
              <th className="py-3 px-4 text-left">Provincia</th>
              <th className="py-3 px-4 text-left">Ciudad</th>
              <th className="py-3 px-4 text-left">Tipo</th>
              <th className="py-3 px-4 text-center">Sensor</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p, idx) => (
                <tr
                  key={p.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-green-50 transition-colors border-b border-gray-100`}
                >
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full font-medium inline-block ${getBadgeStyle(p.status)}`}>
                      {statusLabels[p.status]}
                    </span>
                  </td>
                  <td className="py-3 px-4">{p.country}</td>
                  <td className="py-3 px-4">{p.province}</td>
                  <td className="py-3 px-4">{p.city}</td>
                  <td className="py-3 px-4">{p.type}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => onVerSensor(p)}
                      className="inline-flex items-center cursor-pointer gap-1 text-xs px-3 py-1.5 rounded-full text-white bg-green-600 hover:bg-green-700 transition-all shadow-sm"
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
