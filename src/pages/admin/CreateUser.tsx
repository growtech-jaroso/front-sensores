import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle, XCircle } from "lucide-react";
import Layout from "../../layout/Layout";
import { UserSchema, UserFormType } from "../../schemas/user.schema";
import axiosClient from "../../api/axiosClient";
import { useState } from "react";
import InputPasswordUser from "../../components/Inputs/InputPasswordUser";
import GoBackButton from "../../components/Button/GoBackButton.tsx";

export default function CreateUser() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserFormType>({
    resolver: zodResolver(UserSchema),
  });

  const onSubmit = async (data: UserFormType) => {
    setSubmitting(true);
    setMessage(null);

    try {
      await axiosClient.post("/auth/register", data);
      setMessage({ type: "success", text: "Usuario creado correctamente." });
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const rawMessage = error?.response?.data?.message || "Error al crear el usuario.";
      let customMessage = rawMessage;

      if (rawMessage.toLowerCase().includes("email")) customMessage = "Este correo ya está registrado.";
      if (rawMessage.toLowerCase().includes("username")) customMessage = "Este nombre de usuario ya está registrado.";

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

        <h2 className="text-2xl font-bold text-green-700 mb-6">👤 Crear nuevo usuario</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre de usuario</label>
            <input
              type="text"
              {...register("username")}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              type="email"
              {...register("email")}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <InputPasswordUser register={register("password")} errors={errors.password} placeholder="Contraseña" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
            <InputPasswordUser
              register={register("confirm_password")}
              errors={errors.confirm_password}
              placeholder="Confirmar contraseña"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
            <select
              {...register("role")}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="USER">Usuario</option>
              <option value="SUPPORT">Soporte</option>
              <option value="ADMIN">Admin</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition disabled:opacity-50"
          >
            {submitting ? "Creando..." : "Crear Usuario"}
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
