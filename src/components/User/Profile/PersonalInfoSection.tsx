import { User, ShieldCheck, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useUser from "../../../hooks/useUser.tsx";

type Props = {
  username?: string;
  email?: string;
  role?: string;
};

export default function PersonalInfoSection({ username, email, role }: Props) {
  const { user } = useUser();
  const navigate = useNavigate();

  const displayName = username || user?.username || "";
  const displayEmail = email || user?.email || "";
  const userRole = role || user?.role || "USER";
  const isAdmin = userRole.toUpperCase() === "ADMIN";

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <User className="w-5 h-5 text-green-600" />
        Información personal
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-5 transition-all">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Nombre completo</label>
          <input
            type="text"
            value={displayName}
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-800"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">Correo electrónico</label>
          <input
            type="text"
            value={displayEmail}
            disabled
            className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-800"
          />
        </div>

        {isAdmin && (
          <div className="mt-6 border-t pt-6 border-dashed border-gray-300">
            <div className="bg-green-50 border border-green-300 p-4 rounded-lg shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <ShieldCheck className="w-4 h-4" />
                Tienes acceso administrativo
              </div>
              <p className="text-sm text-gray-600">Puedes acceder a la sección de administración.</p>
              <button
                onClick={() => navigate("/admin/panel")}
                className="inline-flex items-center gap-2 text-sm font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition cursor-pointer"
              >
                <Users className="w-4 h-4" />
                Administrar
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
