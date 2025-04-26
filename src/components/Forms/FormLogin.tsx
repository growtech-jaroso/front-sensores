import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginType } from "../../schemas/login.schema";
import InputPassword from "../Inputs/InputPassword";
import InputText from "../Inputs/InputsText";
import { authService } from "../../services/authService";
import { useNavigate } from "react-router-dom";  


const FormLogin = () => {

  const navigate = useNavigate(); 
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  // Función para manejar el inicio de sesión
  const onSubmit = async ({ email, password }: LoginType) => {
    try {
      await authService.login(email, password);  // Hacer login
      console.log(sessionStorage.getItem("auth_token"));  // Verifica que el token esté en sessionStorage
      navigate("/dashboard");  // Redirigir al dashboard
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      alert(error.message);  // Si hay un error, mostrarlo
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md flex flex-col space-y-5">
      <InputText register={register('email')} errors={errors.email} placeholder="Correo electrónico" inputType="email" />
      <InputPassword register={register('password')} errors={errors.password} placeholder="Contraseña" />
      {<p className="text-red-500 text-center font-semibold"></p>}
      <button
        type="submit"
        className="w-full py-4 cursor-pointer bg-green-600 text-white text-lg font-semibold rounded-lg hover:bg-green-700 transition duration-300 shadow-md"
      >
        Iniciar sesión
      </button>
    </form>
  );
};

export default FormLogin;
