import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import { Users, Settings } from "lucide-react";

export default function PanelIndex() {
  return (
    <Layout>
      <main className="h-full flex items-center justify-center px-4 py-8 overflow-hidden bg-gray-50 animate-fadeInMenu">
        <style>
          {`
          @keyframes fadeInMenu {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeInMenu {
            animation: fadeInMenu 0.2s ease-out forwards;
          }
        `}
        </style>

        <section className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-green-700 mb-8 text-center">Panel de Administración</h1>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            <Link
              to="/admin/usuarios"
              className="bg-white shadow-md rounded-2xl border border-gray-200 p-5 hover:shadow-xl hover:border-green-500 transition-all group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Users className="text-green-600 w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Usuarios</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Visualiza y gestiona todos los usuarios del sistema.
              </p>
            </Link>

            <Link
              to="/admin/configuracion"
              className="bg-white shadow-md rounded-2xl border border-gray-200 p-5 hover:shadow-xl hover:border-green-500 transition-all group"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="bg-green-100 p-3 rounded-xl">
                  <Settings className="text-green-600 w-6 h-6 group-hover:scale-110 transition-transform" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Configuración</h2>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">Ajustes del sistema o de la cuenta admin.</p>
            </Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
