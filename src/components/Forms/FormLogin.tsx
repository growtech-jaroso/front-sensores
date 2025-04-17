import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, LoginType } from "../../schemas/login.schema";
import InputPassword from "../Inputs/InputPassword";
import InputText from "../Inputs/InputsText";


const FormLogin = () => {

  const onSubmit = ({ email, password }: LoginType) => {
    if (email === "test@example.com" && password === "password123") {
      alert("Inicio de sesión exitoso");
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

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
