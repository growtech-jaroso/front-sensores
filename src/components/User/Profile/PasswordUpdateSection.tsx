import { Lock } from "lucide-react";
import { useState } from "react";

type PasswordUpdateSectionProps = {
  onSubmit?: (data: {
    current: string;
    newPass: string;
    confirm: string;
  }) => void;
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
      <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        <Lock className="w-5 h-5 text-green-600" />
        {title}
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Contraseña actual
            </label>
            <input
              type="password"
              value={current}
              onChange={(e) => setCurrent(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Nueva contraseña
            </label>
            <input
              type="password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
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
