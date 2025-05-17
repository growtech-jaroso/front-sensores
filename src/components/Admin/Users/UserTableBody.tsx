import { Trash2, PencilLine } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

type Props = {
  users: User[];
  onDelete: (userId: string) => void;
};

const roleLabels: Record<string, string> = {
  ADMIN: "Administrador",
  SUPPORT: "Soporte",
  USER: "Usuario",
};

const roleColors: Record<string, string> = {
  ADMIN: "bg-red-100 text-red-700 border-red-300",
  SUPPORT: "bg-blue-100 text-blue-700 border-blue-300",
  USER: "bg-green-100 text-green-700 border-green-300",
};

export default function UserTableBody({ users, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <tbody>
      {users.map((user, idx) => (
        <motion.tr
          key={user._id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, delay: idx * 0.03 }}
          className={`transition-all ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50`}
        >
          <td className="px-6 py-3 text-gray-800 font-medium">{user.username}</td>
          <td className="px-6 py-3 text-gray-700">{user.email}</td>
          <td className="px-6 py-3 text-gray-700">
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold border inline-block ${
                roleColors[user.role] || "bg-gray-100 text-gray-700 border-gray-300"
              }`}
            >
              {roleLabels[user.role] || user.role}
            </span>
          </td>
          <td className="px-6 py-3 text-center">
            <div className="flex justify-center gap-3">
              <button
                onClick={() => navigate(`/admin/editar-usuario/${user._id}`)}
                className="text-blue-600 hover:text-blue-800 cursor-pointer transition"
                title="Editar"
              >
                <PencilLine className="w-5 h-5" />
              </button>

              <button
                onClick={() => user.role !== "ADMIN" && onDelete(user._id)}
                disabled={user.role === "ADMIN"}
                className={`transition cursor-pointer ${
                  user.role === "ADMIN" ? "text-gray-400 cursor-not-allowed" : "text-red-600 hover:text-red-800"
                }`}
                title={user.role === "ADMIN" ? "No se puede eliminar un administrador" : "Eliminar"}
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </td>
        </motion.tr>
      ))}
    </tbody>
  );
}
