import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { LogOut } from "lucide-react";
import useUser  from "../hooks/useUser";

// Componentes del perfil
import ProfileLayout from "../components/User/Profile/ProfileLayout";
import PersonalInfoSection from "../components/User/Profile/PersonalInfoSection";
import PasswordUpdateSection from "../components/User/Profile/PasswordUpdateSection";

export default function ProfileTest() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <ProfileLayout>
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-6 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Configuración de perfil</h1>
          <p className="text-sm text-gray-500 mt-1">Visualiza y edita tus datos personales y credenciales de acceso.</p>
        </div>

        <button
          onClick={handleLogout}
          className="group flex items-center gap-2 text-sm font-medium cursor-pointer text-red-600 px-4 py-2 rounded-lg border border-transparent hover:border-red-600 hover:bg-red-50 transition-all"
        >
          <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Cerrar sesión
        </button>
      </div>

      {/* Secciones del perfil */}
      <section className="space-y-12 animate-fadeInSlow">
        <PersonalInfoSection username={user?.username || ""} role={user?.role || "USER"} />
        <PasswordUpdateSection />
      </section>

      {/* Animación suave de entrada */}
      <style>
        {`
          @keyframes fadeInSlow {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeInSlow {
            animation: fadeInSlow 0.5s ease-out;
          }
        `}
      </style>
    </ProfileLayout>
  );
}
