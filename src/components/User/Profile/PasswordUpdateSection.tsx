import { Lock, KeyRound, CheckCircle } from "lucide-react";
import {useState} from "react";
import axiosClient from "../../../api/axiosClient";
import InputPasswordUser from "../../Inputs/InputPasswordUser";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {ChangePasswordFormType, ChangePasswordSchema} from "../../../schemas/change-password.schema.ts";

export default function PasswordUpdateSection() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormType>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const onSubmit: SubmitHandler<ChangePasswordFormType> = async ({old_password, new_password, confirm_password}) => {
    setSubmitting(true);

    try {
      await axiosClient.put("/users/change_password", {
        old_password,
        new_password,
        confirm_password
      });
      setMessage({type: "success", text: "Contraseña actualizada correctamente."});
      reset()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const backendMsg = error?.response?.data?.message || "Error al actualizar la contraseña.";
      if (backendMsg.toLowerCase().includes("old password")) {
        setMessage({type: "error", text: "La contraseña actual no es correcta."});
      } else {
        setMessage({type: "error", text: backendMsg});
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <Lock className="w-5 h-5 text-green-600"/>
        Actualizar contraseña
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Contraseña actual</label>
            <InputPasswordUser
              register={register("old_password")}
              errors={errors.old_password}
              placeholder="Contraseña actual"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Nueva contraseña</label>
            <InputPasswordUser
              register={register("new_password")}
              errors={errors.new_password}
              placeholder="Nueva contraseña"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Confirmar contraseña</label>
            <InputPasswordUser
              register={register("confirm_password")}
              errors={errors.confirm_password}
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
