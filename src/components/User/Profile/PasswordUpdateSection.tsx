import { Lock } from "lucide-react";

export default function PasswordUpdateSection() {
  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        <span className="flex items-center gap-1">
          <Lock className="w-5 h-5 text-green-600" />
        </span>
        Actualizar contraseña
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contraseña actual
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Nueva contraseña
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirmar contraseña
            </label>
            <input
              type="password"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-sm"
            />
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition cursor-pointer"
            >
              Actualizar contraseña
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
