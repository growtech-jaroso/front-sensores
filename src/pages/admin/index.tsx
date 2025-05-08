import { Link } from "react-router-dom";
import { UserPlus, Users, Settings } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fadeInMenu">
      <style>
        {`
          @keyframes fadeInMenu {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeInMenu {
            animation: fadeInMenu 0.2s ease-out forwards;
          }
        `}
      </style>

      <h1 className="text-3xl font-bold text-green-700 mb-6">Panel de Administración</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          to="/admin/crear-usuario"
          className="bg-white shadow-md rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-500 transition"
        >
          <div className="flex items-center gap-4 mb-2">
            <UserPlus className="text-green-600 w-6 h-6" />
            <h2 className="text-xl font-semibold">Crear Usuario</h2>
          </div>
          <p className="text-gray-600 text-sm">Formulario para dar de alta nuevos usuarios.</p>
        </Link>

        <Link
          to="/admin/usuarios"
          className="bg-white shadow-md rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-500 transition"
        >
          <div className="flex items-center gap-4 mb-2">
            <Users className="text-green-600 w-6 h-6" />
            <h2 className="text-xl font-semibold">Usuarios</h2>
          </div>
          <p className="text-gray-600 text-sm">Visualiza y gestiona todos los usuarios del sistema.</p>
        </Link>

        <Link
          to="/admin/configuracion"
          className="bg-white shadow-md rounded-xl border border-gray-200 p-6 hover:shadow-lg hover:border-green-500 transition"
        >
          <div className="flex items-center gap-4 mb-2">
            <Settings className="text-green-600 w-6 h-6" />
            <h2 className="text-xl font-semibold">Configuración</h2>
          </div>
          <p className="text-gray-600 text-sm">Ajustes del sistema o de la cuenta admin.</p>
        </Link>
      </div>
    </div>
  );
}
