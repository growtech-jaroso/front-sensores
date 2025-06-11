import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import axiosClient from "../../api/axiosClient.ts";
import Layout from "../../layout/Layout.tsx";
import {CheckCircle, XCircle} from "lucide-react";
import {CreatePlantationFormType, CreatePlantationSchema} from "../../schemas/create-plantation.schema.ts";
import GoBackButton from "../../components/Button/GoBackButton.tsx";
import InputSelect from "../../components/Inputs/InputSelect.tsx";
import InputText from "../../components/Inputs/InputText.tsx";

export default function CreatePlantation() {
  const [usersEmails, setUsersEmails] = useState<{ value: string; label: string }[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    axiosClient.get("/users/emails")
        .then(res => {
          const data = res.data.data as string[];
          const emails = data.map(email => ({value: email, label: email}))
          setUsersEmails(emails);
        })
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePlantationFormType>({
    resolver: zodResolver(CreatePlantationSchema),
  });

  const onSubmit: SubmitHandler<CreatePlantationFormType> = async (data) => {
    setSubmitting(true);
    setMessage(null);

    try {
      await axiosClient.post("/plantations", data);
      setMessage({ type: "success", text: "Plantación creada correctamente." });
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const rawMessage = error?.response?.data?.message || "Error al crear la plantación.";
      let customMessage = rawMessage;

      if (rawMessage.toLowerCase().includes("name")) customMessage = "Esta plantación ya está registrada para este usuario.";
      if (rawMessage.toLowerCase().includes("email")) customMessage = "El correo no existe.";

      setMessage({ type: "error", text: customMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-8 bg-white p-6 rounded-xl shadow-md animate-fadeIn">
        <style>
          {`
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(10px); }
              to { opacity: 1; transform: translateY(0); }
            }
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
          `}
        </style>

        <GoBackButton />

        <h2 className="text-2xl font-bold text-green-700 mb-6">🌱 Crear nueva plantación</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          <InputText register={register("name")} errors={errors.name} label="Nombre de la plantación" />
          <InputText register={register("country")} errors={errors.country} label="País" />
          <InputText register={register("province")} errors={errors.province} label="Provincia" />
          <InputText register={register("city")} errors={errors.city} label="Ciudad" />
          <InputText register={register("latitude")} errors={errors.latitude} label={"Latitud"} type="number" />
          <InputText register={register("longitude")} errors={errors.longitude} label={"Longitud"} type="number" />
          <InputText register={register("type")} errors={errors.type} label="Tipo de cultivo" />
          <InputSelect register={register("user_email")} errors={errors.user_email} label="Email del propietario" options={usersEmails} />

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {submitting ? "Creando..." : "Crear Plantación"}
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
      </div>
    </Layout>
  );
}