import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginType } from "../../schemas/login.schema";
import InputPassword from "../Inputs/InputPassword";
import InputText from "../Inputs/InputsText";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { showAlert } from "../../components/Alert/AlertService";
import { useUser } from "../../contexts/UserContext";

const FormLogin = () => {
  const navigate = useNavigate();
  const { setUser } = useUser();

  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async ({ email, password }: LoginType) => {
    setGeneralError("");
    setLoading(true);

    try {
      // 🔐 Iniciar sesión y guardar datos en sessionStorage
      await authService.login(email, password);

      // ✅ Obtener y setear el usuario en el contexto
      const userData = authService.getUserData();
      if (userData) setUser(userData);

      // ✅ Mostrar alerta sin botón y redirigir
      await showAlert(
        "success",
        "Sus credenciales son correctas",
        "Bienvenido a GrowPanel",
        undefined,
        true // ← autoClose habilitado
      );

      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setGeneralError(error.message || "Error al iniciar sesión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md flex flex-col space-y-5"
      noValidate
    >
      <InputText
        register={register("email")}
        errors={errors.email}
        placeholder="Correo electrónico"
        inputType="email"
      />

      <InputPassword
        register={register("password")}
        errors={errors.password}
        placeholder="Contraseña"
      />

      {generalError && (
        <p className="text-red-500 text-center text-sm font-medium bg-red-100 px-3 py-2 rounded">
          {generalError}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-md disabled:opacity-50"
      >
        {loading ? "Iniciando sesión..." : "Iniciar sesión"}
      </button>
    </form>
  );
};

export default FormLogin;
