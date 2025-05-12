import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function UserTableHeader({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-green-700 transition group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Volver atrás
      </button>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-3xl font-bold text-green-700">👥 Gestión de Usuarios</h2>
        <button
          onClick={() => navigate("/admin/crear-usuario")}
          className="inline-flex items-center gap-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-2xl shadow-lg transition"
        >
          <span className="text-sm font-medium">Crear Usuario</span>
        </button>
      </div>
    </>
  );
}
