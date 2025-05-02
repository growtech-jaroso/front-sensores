import { Lock, KeyRound } from "lucide-react";
import { useState } from "react";

type PasswordUpdateSectionProps = {
  onSubmit?: (data: { current: string; newPass: string; confirm: string }) => void;
  title?: string;
};

export default function PasswordUpdateSection({
  onSubmit,
  title = "Actualizar contraseña",
}: PasswordUpdateSectionProps) {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit({ current, newPass, confirm });
    } else {
      console.log("Contraseña enviada:", { current, newPass, confirm });
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Lock className="w-5 h-5 text-green-600" />
        {title}
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Contraseña actual */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Contraseña actual</label>
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Nueva contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nueva contraseña</label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Confirmar contraseña */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirmar contraseña</label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-800 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          {/* Botón */}
          <div className="pt-3">
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-5 py-2 rounded-lg shadow-sm transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            >
              <KeyRound className="w-4 h-4" />
              Guardar nueva contraseña
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
