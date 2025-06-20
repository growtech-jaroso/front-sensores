import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react";
import axiosClient from "../../api/axiosClient";
import Layout from "../../layout/Layout";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputPasswordUser from "../../components/Inputs/InputPasswordUser";
import {EditUserFormType, EditUserSchema} from "../../schemas/edit-user.schema.ts";
import GoBackButton from "../../components/Button/GoBackButton.tsx";
import InputText from "../../components/Inputs/InputText.tsx";
import InputSelect from "../../components/Inputs/InputSelect.tsx";

export default function EditUser() {
  const { userId } = useParams();

  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditUserFormType>({
    resolver: zodResolver(EditUserSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get(`/users/${userId}`);
        const user = res.data?.data;

        setValue("username", user.username || "");
        setValue("email", user.email || "");
        setValue("role", user.role || "USER");
        setValue("password", "");
        setValue("confirm_password", "");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setMessage({ type: "error", text: "Error al cargar el usuario." });
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchUser();
  }, [userId, setValue]);

  const onSubmit = async (data: EditUserFormType) => {
    setMessage(null);
    setSubmitting(true);

    try {
      await axiosClient.put(`/users/${userId}`, data);
      setMessage({ type: "success", text: "Usuario actualizado correctamente." });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const rawMessage = error?.response?.data?.message || "Error al actualizar el usuario.";
      let customMessage = rawMessage;

      if (rawMessage.toLowerCase().includes("username")) customMessage = "Este nombre de usuario ya está registrado.";
      if (rawMessage.toLowerCase().includes("email")) customMessage = "Este correo ya está registrado.";
      if (rawMessage.toLowerCase().includes("you cannot edit yourself")) {
        customMessage = "No puedes editar tu propio usuario.";
      }

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

        <h2 className="text-2xl font-bold text-green-700 mb-6">✏️ Editar Usuario</h2>

        {loading ? (
          <p className="text-center text-gray-500">Cargando usuario...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputText register={register("username")} errors={errors.username} label="Nombre de usuario" />
            <InputText register={register("email")} errors={errors.email} label="Correo electrónico" />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nueva contraseña</label>
              <InputPasswordUser
                register={register("password")}
                errors={errors.password}
                placeholder="Nueva contraseña"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
              <InputPasswordUser
                register={register("confirm_password")}
                errors={errors.confirm_password}
                placeholder="Confirmar contraseña"
              />
            </div>

            <InputSelect register={register("role")} errors={errors.role} label="Rol" options={[
              {value: "USER", label: "Usuario", selected: true},
              {value: "SUPPORT", label: "Soporte"},
              {value: "ADMIN", label: "Administrador"},
            ]} />

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
