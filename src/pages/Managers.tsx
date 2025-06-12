import Layout from "../layout/Layout.tsx";
import GoBackButton from "../components/Button/GoBackButton.tsx";
import InputText from "../components/Inputs/InputText.tsx";
import {CheckCircle, XCircle} from "lucide-react";
import axiosClient from "../api/axiosClient.ts";
import {useEffect, useState} from "react";
import {Plantation} from "../interfaces/Plantation.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useNavigate, useParams} from "react-router-dom";
import {ManageManagersFormType, ManageManagersSchema} from "../schemas/manage-managers.schema.ts";

export default function Managers() {

  const navigate = useNavigate();
  const { plantationId } = useParams();

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [plantation, setPlantation] = useState<Plantation | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ManageManagersFormType>({
    resolver: zodResolver(ManageManagersSchema),
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
        setPlantation(plantation);

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        setMessage({ type: "error", text: "Error al cargar la plantación." });
      } finally {
        setLoading(false);
      }
    };

    if (plantationId) fetchPlantation();
  }, [navigate, plantationId, setValue]);

  const onSubmit: SubmitHandler<ManageManagersFormType> = async (data) => {
    setMessage(null);
    setSubmitting(true);

    try {
      await axiosClient.post(`/plantations/${plantationId}/assistants`, data);
      setMessage({ type: "success", text: "Manager añadido correctamente." });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const rawMessage = error?.response?.data?.message ?? "Error al añadir el manager.";
      let customMessage;

      if (rawMessage.toLowerCase().includes("email")) customMessage = "El correo electrónico no existe";
      else customMessage = "Error al añadir el manager.";

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

        <h2 className="text-2xl font-bold text-green-700 mb-6">Administrar managers de la plantación {plantation?.name}</h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando información de la plantación...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputText register={register("manager_email")} errors={errors.manager_email} label="Correo electrónico del manager" type="email" />
            <section className="flex gap-4 flex-wrap">
              <button
                type="submit"
                name="add"
                disabled={submitting}
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition disabled:opacity-50"
              >
                {submitting ? "Añadiendo..." : "Añadir Manager"}
              </button>
            </section>

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