import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/authService";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-full transition"
      >
        <User className="w-5 h-5 text-gray-700" />
        <span className="text-sm text-gray-800 font-medium">Usuario</span>
      </div>

      {/* Dropdown animado */}
      {open && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50
          animate-fadeInMenu origin-top-right"
        >
          <ul className="py-1" role="menu" aria-label="Opciones de usuario">
            <li
              onClick={() => navigate("/perfil")}
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              role="menuitem"
            >
              <User className="w-4 h-4" /> Perfil
            </li>

            <li
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition"
              role="menuitem"
            >
              <Settings className="w-4 h-4" /> Configuración
            </li>
            <hr className="my-1 border-gray-200" />
            <li
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition"
              role="menuitem"
            >
              <LogOut className="w-4 h-4" /> Cerrar sesión
            </li>
          </ul>
        </div>
      )}

      {/* Animación personalizada */}
      <style>
        {`
          @keyframes fadeInMenu {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          .animate-fadeInMenu {
            animation: fadeInMenu 0.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
