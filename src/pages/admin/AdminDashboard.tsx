import Layout from "../../layout/Layout";
import {Users, Leaf, Satellite} from "lucide-react";
import DashboardLink from "../../components/Admin/Dashboard/DashboardLink.tsx";

export default function AdminDashboard() {
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
            <DashboardLink
              title="Usuarios"
              paragraph="Visualiza y gestiona todos los usuarios."
              to="/admin/usuarios"
              icon={<Users className="text-green-600 w-6 h-6 group-hover:scale-110 transition-transform" />}
            />
            <DashboardLink
              title="Plantaciones"
              paragraph="Visualiza y gestiona todas las plantaciones."
              to="/admin/plantaciones"
              icon={<Leaf className="text-green-600 w-6 h-6 group-hover:scale-110 transition-transform" />}
            />
            <DashboardLink
              title="Sensores"
              paragraph="Visualiza y gestiona todas los sensores."
              to="/admin/sensores"
              icon={<Satellite className="text-green-600 w-6 h-6 group-hover:scale-110 transition-transform" />}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}
