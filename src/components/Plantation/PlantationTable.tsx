import {Eye, User} from "lucide-react";
import { IndicatorStatus, IndicatorStatusType } from "../../types/indicatorStatus";
import type { Plantation } from "../../interfaces/Plantation";
import { motion } from "framer-motion";
import {Dispatch, SetStateAction} from "react";
import {Link} from "react-router-dom";
import {authService} from "../../services/authService.ts";

const getBadgeStyle = (status: IndicatorStatus) => {
  switch (status) {
    case IndicatorStatus.ONLINE:
      return "bg-green-100 text-green-700 border border-green-400";
    case IndicatorStatus.OFFLINE:
      return "bg-red-100 text-red-700 border border-red-400";
    default:
      return "bg-yellow-100 text-yellow-700 border border-yellow-400";
  }
};

type PlantationTableProps = {
  plantations: Plantation[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  onPageChange: (page: number) => void;
  search: string;
  setSearch: (search: string) => void;
  setStatus: Dispatch<SetStateAction<IndicatorStatus>>;
  statusFilter?: IndicatorStatus;
};

export default function PlantationTable({
  plantations,
  currentPage,
  totalPages,
  loading,
  onPageChange,
  search,
  setSearch,
  setStatus,
  statusFilter = IndicatorStatus.TOTAL,
}: PlantationTableProps) {
  const handlePrevious = () => {
    if (!loading && currentPage > 1) onPageChange(currentPage - 1);
  };

  const userId = authService.getUserData()!.id;

  const handleNext = () => {
    if (!loading && currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white border border-gray-100 rounded-2xl shadow-sm p-6"
    >
      {/* Encabezado y búsqueda */}
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
        {[IndicatorStatus.TOTAL, IndicatorStatus.ONLINE, IndicatorStatus.OFFLINE].map((status) => (
          <button
            key={status}
            onClick={() => setStatus(status)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full border transition ${
              statusFilter === status
                ? "bg-green-600 text-white border-green-600 shadow"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Tabla escritorio */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-100 text-xs text-gray-600 font-semibold">
            <tr>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">País</th>
              <th className="py-3 px-4 text-left">Provincia</th>
              <th className="py-3 px-4 text-left">Ciudad</th>
              <th className="py-3 px-4 text-left">Tipo</th>
              <th className="py-3 px-4 text-center">Managers</th>
              <th className="py-3 px-4 text-center">Sensor</th>
            </tr>
          </thead>
          <tbody>
            {plantations.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-6 text-gray-500">
                  No hay plantaciones disponibles.
                </td>
              </tr>
            ) : (
              plantations.map((p, idx) => (
                <motion.tr
                  key={p.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.25, delay: idx * 0.04 }}
                  className={`$${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } border-b border-gray-100 hover:bg-green-50 transition-colors`}
                >
                  <td className="py-3 px-4">{p.name}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getBadgeStyle(
                        IndicatorStatus[p.status as IndicatorStatusType] ?? IndicatorStatus.TOTAL
                      )}`}
                    >
                      {IndicatorStatus[p.status as IndicatorStatusType] ?? "Desconocido"}
                    </span>
                  </td>
                  <td className="py-3 px-4">{p.country}</td>
                  <td className="py-3 px-4">{p.province}</td>
                  <td className="py-3 px-4">{p.city}</td>
                  <td className="py-3 px-4">{p.type}</td>
                  <td className="py-3 px-4 text-center">
                    <Link
                      to={`/dashboard/plantacion/${p.id}/managers`}
                      className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full transition ${p.owner_id !== userId ? "pointer-events-none bg-gray-300 cursor-not-allowed" : "cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"}`}
                    >
                      <User size={16} /> Managers
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <Link
                      to={`/dashboard/plantacion/${p.id}`}
                      className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full text-white cursor-pointer bg-green-600 hover:bg-green-700 transition"
                    >
                      <Eye size={16} /> Ver Sensores
                    </Link>
                  </td>
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Vista tarjeta para móvil */}
      <div className="md:hidden space-y-4">
        {plantations.length === 0 ? (
          <div className="text-center text-gray-500 text-sm">No hay plantaciones disponibles.</div>
        ) : (
          plantations.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="bg-white border rounded-xl p-4 shadow-sm space-y-2 text-sm"
            >
              <div>
                <h3 className="text-green-700 font-semibold text-base break-words">{p.name}</h3>
              </div>
              <div>
                <span
                  className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${getBadgeStyle(
                    IndicatorStatus[p.status as IndicatorStatusType] ?? IndicatorStatus.TOTAL
                  )}`}
                >
                  {IndicatorStatus[p.status as IndicatorStatusType] ?? "Desconocido"}
                </span>
              </div>
              <p className="text-xs text-gray-600">
                <strong>Ubicación:</strong> {p.city}, {p.province}, {p.country}
              </p>
              <p className="text-xs text-gray-500">
                <strong>Tipo:</strong> {p.type}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Link
                  to={`/dashboard/plantacion/${p.id}/managers`}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs py-1.5 rounded-full flex justify-center items-center gap-1 transition"
                >
                  <User size={14} /> Managers
                </Link>
                <Link
                  to={`/dashboard/plantacion/${p.id}`}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs py-1.5 rounded-full flex justify-center items-center gap-1 transition"
                >
                  <Eye size={14} /> Sensores
                </Link>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-4 text-sm flex-wrap">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1 || loading}
            className={`px-4 py-2 rounded-lg border transition ${
              currentPage === 1 || loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            Anterior
          </button>

          <span className="text-gray-700 font-medium">
            Página {currentPage} de {totalPages}
          </span>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages || loading}
            className={`px-4 py-2 rounded-lg border transition ${
              currentPage === totalPages || loading
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </motion.div>
  );
}
