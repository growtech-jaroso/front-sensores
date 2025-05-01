import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "../services/authService";
import { LogOut } from "lucide-react";

// Componentes del perfil
import ProfileLayout from "../components/User/Profile/ProfileLayout";
import PersonalInfoSection from "../components/User/Profile/PersonalInfoSection";
import EmailUpdateSection from "../components/User/Profile/EmailUpdateSection";
import PasswordUpdateSection from "../components/User/Profile/PasswordUpdateSection";

export default function ProfileTest() {
  const navigate = useNavigate();

  const [usuario] = useState({
    nombre: "Admin",
    email: "admin@gmail.com",
    rol: "ADMIN",
  });

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <ProfileLayout>
      {/* Encabezado */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800 leading-tight">
            Configuración del perfil
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Gestiona tu información personal, acceso y seguridad
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Cerrar sesión */}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 text-sm text-red-600 px-3 py-1.5 rounded-md transition-all duration-200 hover:text-red-700 hover:bg-red-100 hover:shadow-inner cursor-pointer"
          >
            <LogOut
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            <span className="transition-colors duration-200">
              Cerrar sesión
            </span>
          </button>
        </div>
      </header>

      <div className="space-y-10 animate-fadeIn">
        <PersonalInfoSection nombre={usuario.nombre} rol={usuario.rol} />
        <EmailUpdateSection currentEmail={usuario.email} />
        <PasswordUpdateSection />
      </div>

      <style>
        {`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(8px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out;
          }
        `}
      </style>
    </ProfileLayout>
  );
}
