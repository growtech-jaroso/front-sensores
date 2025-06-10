import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../api/axiosClient.ts";
import {EditPlantationFormType, EditPlantationSchema} from "../schemas/edit-plantation.schema.ts";
import {Plantation} from "../interfaces/Plantation.ts";
import Layout from "../layout/Layout.tsx";
import GoBackButton from "../components/Button/GoBackButton.tsx";
import InputText from "../components/Inputs/InputText.tsx";

export default function EditPlantation() {
  const navigate = useNavigate();
  const { plantationId } = useParams();

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditPlantationFormType>({
    resolver: zodResolver(EditPlantationSchema),
  });

  useEffect(() => {
    const fetchPlantation = async () => {
      try {
        const res = await axiosClient.get(`/plantations/${plantationId}`);

        // Check if the response status is 403 (Forbidden) to redirect the user to the last page
        if (res.status === 403) {
          navigate(-1);
          return;
        }

        const plantation = res.data?.data as Plantation;

        setValue("name", plantation.name ?? "");
        setValue("type", plantation.type ?? "");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        setMessage({ type: "error", text: "Error al cargar la plantación." });
      } finally {
        setLoading(false);
      }
    };

    if (plantationId) fetchPlantation();
  }, [navigate, plantationId, setValue]);

  const onSubmit = async (data: EditPlantationFormType) => {
    setMessage(null);
    setSubmitting(true);

    try {
      await axiosClient.put(`/plantations/${plantationId}`, data);
      setMessage({ type: "success", text: "Plantación actualizada correctamente." });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const rawMessage = error?.response?.data?.message || "Error al actualizar la plantación.";
      let customMessage = rawMessage;

      if (rawMessage.toLowerCase().includes("name")) customMessage = "El nombre de la plantación ya está registrado en la misma empresa.";
      else customMessage = "Error al actualizar la plantación.";

      setMessage({ type: "error", text: customMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md animate-fadeIn">
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}</style>

        <GoBackButton />

        <h2 className="text-2xl font-bold text-green-700 mb-6">✏️ Editar Plantación</h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando plantación...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputText register={register("name")} errors={errors.name} label="Nombre de la plantación" />
            <InputText register={register("type")} errors={errors.type} label="Tipo de la plantación" />
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
            >
              {submitting ? "Guardando..." : "Guardar Cambios"}
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
        )}
      </div>
    </Layout>
  );
}
