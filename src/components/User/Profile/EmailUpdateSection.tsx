import { useState } from "react";
import { Mail } from "lucide-react";
import { useUser } from "../../../contexts/UserContext";

type Props = {
  currentEmail?: string;
};

export default function EmailUpdateSection({ currentEmail }: Props) {
  const { user } = useUser();
  const [emailNuevo, setEmailNuevo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!emailNuevo || !emailNuevo.includes("@")) {
      setMensaje("Introduce un correo válido.");
      return;
    }

    // Aquí iría la llamada a la API
    setMensaje("Correo actualizado (simulado)");
    setEmailNuevo("");
  };

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        <Mail className="w-5 h-5 text-green-600" />
        Correo electrónico
      </h2>

      <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Correo actual
            </label>
            <input
              type="email"
              value={currentEmail || user?.email || ""}
              disabled
              className="w-full mt-1 px-4 py-2 bg-gray-100 border rounded-lg text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Nuevo correo
            </label>
            <input
              type="email"
              value={emailNuevo}
              onChange={(e) => setEmailNuevo(e.target.value)}
              placeholder="nuevo@email.com"
              className="w-full mt-1 px-4 py-2 border rounded-lg text-sm focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {mensaje && (
            <p className="text-sm text-green-600 font-medium">{mensaje}</p>
          )}

          <div className="flex justify-start">
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition"
            >
              Actualizar correo
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
