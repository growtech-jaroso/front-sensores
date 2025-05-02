import { User, ShieldCheck, Users } from "lucide-react";
import { useUser } from "../../../contexts/UserContext";

type Props = {
  name?: string;
  email?: string;
  rol?: string;
};

export default function PersonalInfoSection({ name, email, rol }: Props) {
  const { user } = useUser();
  const displayName = name || user?.name || "";
  const displayEmail = email || user?.email || "";
  const userRole = rol || user?.roles?.[0] || "USER";
  const isAdmin = userRole.toUpperCase() === "ADMIN";

  return (
    <section className="space-y-6">
      {/* Título principal */}
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <User className="w-5 h-5 text-green-600" />
        Información personal
      </h2>

      {/* Contenedor principal */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-5 transition-all">
        {/* Campo: Nombre */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Nombre completo</label>
          <input
            type="text"
            value={displayName}
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Campo: Correo electrónico */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Correo electrónico</label>
          <input
            type="text"
            value={displayEmail}
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Panel Admin */}
        {isAdmin && (
          <div className="mt-6 border-t pt-6 border-dashed border-gray-300">
            <div className="bg-green-50 border border-green-300 p-4 rounded-lg shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <ShieldCheck className="w-4 h-4" />
                Tienes acceso administrativo
              </div>
              <p className="text-sm text-gray-600">Puedes gestionar al personal autorizado desde esta sección.</p>
              <button className="inline-flex items-center gap-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition cursor-pointer">
                <Users className="w-4 h-4" />
                Gestionar personal
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
