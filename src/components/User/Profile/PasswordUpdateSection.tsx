import { Lock, KeyRound, CheckCircle } from "lucide-react";
import { useState } from "react";
import axiosClient from "../../../api/axiosClient";
import ErrorText from "../../Errors/ErrorText";
import InputPasswordUser from "../../Inputs/InputPasswordUser";

export default function PasswordUpdateSection() {
  const [current, setCurrent] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (newPass.length < 8) {
      setMessage({ type: "error", text: "La nueva contraseña debe tener al menos 8 caracteres." });
      return;
    }

    if (newPass !== confirm) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden." });
      return;
    }

    setSubmitting(true);

    try {
      await axiosClient.put("/users/change_password", {
        old_password: current,
        new_password: newPass,
        confirm_password: confirm,
      });
      setMessage({ type: "success", text: "Contraseña actualizada correctamente." });
      setCurrent("");
      setNewPass("");
      setConfirm("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backendMsg = error?.response?.data?.message || "Error al actualizar la contraseña.";
      if (backendMsg.toLowerCase().includes("old password")) {
        setMessage({ type: "error", text: "La contraseña actual no es correcta." });
      } else {
        setMessage({ type: "error", text: backendMsg });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const showFieldError = (field: string): string | undefined => {
    if (message?.type !== "error") return;
    if (field === "current" && message.text.toLowerCase().includes("actual")) return message.text;
    if (field === "newPass" && message.text.toLowerCase().includes("caracteres")) return message.text;
    if (field === "confirm" && message.text.toLowerCase().includes("coinciden")) return message.text;
    return;
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Lock className="w-5 h-5 text-green-600" />
        Actualizar contraseña
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Contraseña actual</label>
            <InputPasswordUser
              register={{ name: "current", onChange: (e) => setCurrent(e.target.value), value: current } as any}
              errors={showFieldError("current") ? { message: showFieldError("current") } : undefined}
              placeholder="Contraseña actual"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nueva contraseña</label>
            <InputPasswordUser
              register={{ name: "newPass", onChange: (e) => setNewPass(e.target.value), value: newPass } as any}
              errors={showFieldError("newPass") ? { message: showFieldError("newPass") } : undefined}
              placeholder="Nueva contraseña"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirmar contraseña</label>
            <InputPasswordUser
              register={{ name: "confirm", onChange: (e) => setConfirm(e.target.value), value: confirm } as any}
              errors={showFieldError("confirm") ? { message: showFieldError("confirm") } : undefined}
              placeholder="Confirmar contraseña"
            />
          </div>

          {message && message.type === "success" && (
            <div className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-green-100 text-green-700 border border-green-300">
              <CheckCircle className="w-5 h-5" />
              <span>{message.text}</span>
            </div>
          )}

          <div className="pt-3">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium text-sm px-5 py-2 rounded-lg shadow-sm transition cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 disabled:opacity-50"
            >
              <KeyRound className="w-4 h-4" />
              {submitting ? "Guardando..." : "Guardar nueva contraseña"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
