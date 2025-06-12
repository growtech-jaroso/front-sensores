import {FormEvent, useState} from "react";
import axiosClient from "../../../api/axiosClient.ts";
import {CheckCircle, XCircle} from "lucide-react";

interface Props {
  plantationId: string;
}

export default function ActuatorForm({plantationId}: Props) {

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      await axiosClient.post(`/plantations/${plantationId}/sensors/actuator`, JSON.stringify({}));
      setMessage({ type: "success", text: "Actuador creado correctamente." });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const message = error?.response?.data?.message || "Error al crear el actuador.";

      setMessage({ type: "error", text: message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 mt-4">
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
      >
        {submitting ? "Creando..." : "Crear Actuador"}
      </button>

      {message && (
        <div
          className={`flex items-center gap-2 mt-4 text-sm px-4 py-2 rounded-md ${
            message.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
          <span>{message.text}</span>
        </div>
      )}
    </form>
  )
}