import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { AlertDelete } from "../../components/Alert/AlertDelete";
import PaginationTable from "../../components/Pagination/PaginationTable";
import axiosClient from "../../api/axiosClient";

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
    <div className="p-6 animate-fadeIn">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>

      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-green-700 transition group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 group-hover:-translate-x-1 transition-transform cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver atrás
      </button>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-green-700">👥 Usuarios</h2>
        <button
          onClick={() => navigate("/admin/crear-usuario")}
          className="inline-flex items-center gap-2 bg-green-600 cursor-pointer hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Crear Usuario
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          name="username"
          placeholder="Buscar por nombre"
          value={search.username}
          onChange={handleSearchChange}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-green-400"
        />
        <input
          type="text"
          name="email"
          placeholder="Buscar por correo"
          value={search.email}
          onChange={handleSearchChange}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-green-400"
        />
      </div>

      <div className="overflow-x-auto rounded-xl shadow-lg bg-white">
        <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-green-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">
                Correo
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-green-800 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-green-800 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-green-50 transition">
                <td className="px-6 py-4 font-medium text-gray-900">{user.username}</td>
                <td className="px-6 py-4 text-gray-700">{user.email}</td>
                <td className="px-6 py-4">
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
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-3">
                    <button className="text-green-600 hover:text-green-800 transition" title="Editar">
                      <Pencil className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-600 hover:text-red-800 transition"
                      title="Eliminar"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PaginationTable currentPage={page} totalPages={totalPages} loading={loading} onPageChange={setPage} />
    </div>
  );
}
