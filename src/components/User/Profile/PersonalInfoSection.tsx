import { User, ShieldCheck, Users } from "lucide-react";
import { useUser } from "../../../contexts/UserContext";

type Props = {
  name?: string;
  rol?: string;
};

export default function PersonalInfoSection({ name, rol }: Props) {
  const { user } = useUser();
  const displayName = name || user?.name || "";
  const userRole = rol || user?.roles?.[0] || "USER";
  const isAdmin = userRole.toUpperCase() === "ADMIN";

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        <User className="w-5 h-5 text-green-600" />
        Información personal
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Nombre completo
          </label>
          <input
            type="text"
            value={displayName}
            disabled
            className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg text-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Rol</label>
          <input
            type="text"
            value={userRole}
            disabled
            className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg text-sm text-gray-700"
          />
        </div>

        {isAdmin && (
          <>
            <hr className="my-4 border-gray-200" />
            <div className="bg-gray-50 border border-dashed border-green-400 p-4 rounded-md space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-green-700">
                <ShieldCheck className="w-4 h-4" />
                Acceso administrativo
              </div>
              <p className="text-xs text-gray-600">
                Puedes gestionar al personal autorizado desde esta sección.
              </p>
              <button className="inline-flex items-center gap-2 text-xs font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition cursor-pointer">
                <Users className="w-4 h-4" />
                Gestionar personal
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
