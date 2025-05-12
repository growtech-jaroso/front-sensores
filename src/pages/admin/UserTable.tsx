import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, PencilLine, Trash2, Mail, UserRound } from "lucide-react";
import { AlertDelete } from "../../components/Alert/AlertDelete";
import PaginationTable from "../../components/Pagination/PaginationTable";
import axiosClient from "../../api/axiosClient";
import { motion } from "framer-motion";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ username: "", email: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/users", {
        params: {
          page,
          limit: 10,
          username: search.username,
          email: search.email,
        },
      });
      setUsers(res.data.data);
      setTotalPages(res.data.meta.total_pages);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await axiosClient.patch(`/users/${userId}`, { role: newRole });
      setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
    } catch (error) {
      console.error("Error al actualizar rol:", error);
    }
  };

  const handleDelete = async (userId: string) => {
    const confirmed = await AlertDelete();
    if (confirmed) {
      try {
        await axiosClient.delete(`/users/${userId}`);
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <motion.div
      key={page + search.username + search.email}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6"
    >
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-700 transition group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver atrás
      </button>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-green-700">👥 Gestión de Usuarios</h2>
        <button
          onClick={() => navigate("/admin/crear-usuario")}
          className="inline-flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl shadow-lg transition"
        >
          <Plus className="w-5 h-5" /> Crear Usuario
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            name="username"
            placeholder="Buscar por nombre"
            value={search.username}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-green-400"
          />
        </div>
        <div className="relative w-full sm:w-64">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            name="email"
            placeholder="Buscar por correo"
            value={search.email}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-green-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl shadow-md bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">Nombre</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">Correo</th>
              <th className="px-6 py-4 text-left font-semibold text-gray-600">Rol</th>
              <th className="px-6 py-4 text-center font-semibold text-gray-600">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <motion.tr
                key={user._id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className={`transition-all ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50`}
              >
                <td className="px-6 py-3 text-gray-800 font-medium">{user.username}</td>
                <td className="px-6 py-3 text-gray-700">{user.email}</td>
                <td className="px-6 py-3">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="text-sm px-3 py-1.5 border border-gray-300 rounded-md bg-white focus:ring-green-400"
                  >
                    <option value="USER">Usuario</option>
                    <option value="SUPPORT">Soporte</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800 cursor-pointer transition" title="Editar">
                      <PencilLine className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 cursor-pointer hover:text-red-800 transition"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationTable currentPage={page} totalPages={totalPages} loading={loading} onPageChange={setPage} />
    </motion.div>
  );
}
