import { motion } from "framer-motion";
import {Leaf, MapPin, Info, Satellite, Pencil, Trash2, Plus} from "lucide-react";
import { Plantation } from "../../../interfaces/Plantation";
import {useAuth} from "../../../hooks/useAuth.tsx";
import {useNavigate} from "react-router-dom";
import {IndicatorStatus} from "../../../types/indicatorStatus.ts";

interface PlantationCardProps {
  plantation: Plantation;
  handleDeleteClick: (plantation: Plantation) => void
}

export function PlantationCard({ plantation, handleDeleteClick}: PlantationCardProps) {

  const {isAdmin} = useAuth()
  const navigate = useNavigate()

  const handleEditPlantation = () => {
    navigate(`/admin/editar-plantacion/${plantation.id}`)
  }

  const handleViewSensors = () => {
    navigate(`/dashboard/plantacion/${plantation.id}`)
  }

  const handleCreateDevice = () => {
    navigate(`/admin/crear-dispositivo/${plantation.id}`)
  }

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="group rounded-xl border p-4 bg-white hover:border-green-400 shadow-sm hover:shadow-md"
    >
      <div className="space-y-2">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" /> {plantation.name}
        </h3>
        <p className="text-sm text-gray-600 flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {plantation.country} — {plantation.province}, {plantation.city}
        </p>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <Info className="w-4 h-4" /> Tipo: {plantation.type} | Estado: { IndicatorStatus[plantation.status as keyof typeof IndicatorStatus]}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-1">
          <button
            onClick={() => handleViewSensors()}
            className="inline-flex items-center gap-1 cursor-pointer px-3 py-1.5 text-sm font-medium text-blue-700 border border-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Satellite className="w-4 h-4" /> Ver Sensores
          </button>
        {isAdmin && (
          <>
            <button
              onClick={() => handleCreateDevice()}
              className="inline-flex items-center cursor-pointer gap-1 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition"
            >
              <Plus className="w-4 h-4" /> Dispositivo
            </button>
            <button
              onClick={() => handleEditPlantation()}
              className="inline-flex items-center cursor-pointer gap-1 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
            >
              <Pencil className="w-4 h-4" /> Editar
            </button>
            <button
              onClick={() => handleDeleteClick(plantation)}
              className="inline-flex items-center cursor-pointer gap-1 px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" /> Borrar
            </button>
          </>
        )}
      </div>
    </motion.li>
  );
}
