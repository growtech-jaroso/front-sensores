import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2 } from "lucide-react";
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
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient
      .get("/admin/usuarios")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error al cargar usuarios:", err))
      .finally(() => setLoading(false));
  }, []);

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
        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-green-700 transition-all group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 group-hover:-translate-x-1 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Volver atrás
      </button>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-green-700">👥 Gestión de usuarios</h2>
        <button
          onClick={() => navigate("/admin/crear-usuario")}
          className="inline-flex items-center gap-2 bg-green-600 cursor-pointer hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Crear Usuario
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl shadow bg-white">
        <table className="min-w-full text-sm text-gray-800">
          <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider border-b">
            <tr>
              <th className="px-6 py-4 text-left">Nombre</th>
              <th className="px-6 py-4 text-left">Correo</th>
              <th className="px-6 py-4 text-left">Rol</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  Cargando usuarios...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-400">
                  No hay usuarios registrados.
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={`transition-colors ${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-green-50`}
                >
                  <td className="px-6 py-4 font-medium">{user.username}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center gap-4">
                      <button className="text-blue-600 hover:text-blue-800 transition" title="Editar">
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition" title="Eliminar">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
