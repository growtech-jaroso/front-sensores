import "animate.css/animate.min.css";
import Logo from "../components/Logo/Logo";
import FormLogin from "../components/Forms/FormLogin";
import FloatImage from "../components/FloatImage/FloatImage";
import LinksLogin from "../components/Links/LinksLogin";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center items-center px-4">
      <div className="w-full max-w-6xl p-6 sm:p-10 bg-white shadow-2xl rounded-2xl flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
        {/* Contenido con animación suave */}
        <div className="flex flex-col lg:flex-row justify-between items-center w-full animate__animated animate__fadeIn animate__slow">
          {/* Formulario y logo */}
          <div className="w-full lg:w-1/2 flex flex-col items-center space-y-8">
            <Logo />
            <FormLogin />
            <LinksLogin />
          </div>

          {/* Imagen flotante a la derecha */}
          <FloatImage />
        </div>
      </div>

      {/* Animación flotante */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
