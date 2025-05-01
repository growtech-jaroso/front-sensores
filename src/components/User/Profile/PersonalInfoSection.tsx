import { User, ShieldCheck } from "lucide-react";

type Props = {
  nombre: string;
  rol: string;
};

export default function PersonalInfoSection({ nombre, rol }: Props) {
  const isAdmin = rol.toLowerCase() === "admin";

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        <span className="flex items-center gap-1">
          <User className="w-5 h-5 text-green-600" />
        </span>
        Información personal
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Nombre completo
          </label>
          <input
            type="text"
            value={nombre}
            disabled
            className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg text-sm text-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600">Rol</label>
          <input
            type="text"
            value={rol}
            disabled
            className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg text-sm text-gray-700"
          />
        </div>

        {/* Gestión de personal para admins */}
        {isAdmin && (
          <>
            <hr className="my-4 border-gray-200" />
            <div className="bg-gray-50 border border-dashed border-green-400 p-4 rounded-md">
              <div className="flex items-center gap-2 text-sm font-medium text-green-700">
                <ShieldCheck className="w-4 h-4" />
                Acceso administrativo
              </div>
              <p className="text-xs text-gray-600 mt-1 mb-3">
                Como administrador puedes gestionar al personal autorizado.
              </p>
              <button className="text-xs font-medium bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition cursor-pointer">
                Gestionar personal
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
