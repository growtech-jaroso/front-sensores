import { motion } from "framer-motion";
import { Leaf, MapPin, Info, Satellite, Pencil, Trash2 } from "lucide-react";
import { Plantation } from "../../../interfaces/Plantation";

interface PlantationCardProps {
  plantation: Plantation;
  onViewSensors?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function PlantationCard({ plantation, onViewSensors, onEdit, onDelete }: PlantationCardProps) {
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
          <Info className="w-4 h-4" /> Tipo: {plantation.type} | Estado: {plantation.status}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        {onViewSensors && (
          <button
            onClick={() => onViewSensors(plantation.id)}
            className="inline-flex items-center gap-1 cursor-pointer px-3 py-1.5 text-sm font-medium text-blue-700 border border-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Satellite className="w-4 h-4" /> Ver Sensores
          </button>
        )}
        {onEdit && (
          <button
            onClick={() => onEdit(plantation.id)}
            className="inline-flex items-center cursor-pointer gap-1 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
          >
            <Pencil className="w-4 h-4" /> Editar
          </button>
        )}
        {onDelete && (
          <button
            onClick={() => onDelete(plantation.id)}
            className="inline-flex items-center cursor-pointer gap-1 px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" /> Borrar
          </button>
        )}
      </div>
    </motion.li>
  );
}
