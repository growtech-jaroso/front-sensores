import { Trash2, PencilLine } from "lucide-react";
import { motion } from "framer-motion";

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

export default function UserTableBody({ users, onDelete }: Props) {
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
          <td className="px-6 py-3 text-gray-700">{user.role}</td>
          <td className="px-6 py-3 text-center">
            <div className="flex justify-center gap-3">
              <button className="text-blue-600 hover:text-blue-800 transition cursor-pointer" title="Editar">
                <PencilLine className="w-5 h-5" />
              </button>
              <button
                onClick={() => onDelete(user._id)}
                className="text-red-600 hover:text-red-800 transition cursor-pointer"
                title="Eliminar"
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
