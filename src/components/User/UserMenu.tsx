import { useState, useRef, useEffect } from "react";
import { User, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";  // Importa el hook useNavigate
import { authService } from "../../services/authService";  // Importa authService

// Definimos el tipo de las propiedades del componente
export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();  // Usamos el hook para la navegación

  // Manejador de eventos para cerrar el menú al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    // Agregamos el evento al hacer clic
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Función para manejar el logout
  const handleLogout = () => {
    authService.logout();  // Llamamos al método de logout
    navigate("/login");  // Redirigimos a la página de login
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

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-50 animate-dropdown">
          <ul className="py-1">
            <li className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition">
              <User className="w-4 h-4" /> Perfil
            </li>
            <li className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer transition">
              <Settings className="w-4 h-4" /> Configuración
            </li>
            <hr className="my-1 border-gray-200" />
            <li
              onClick={handleLogout}  // Llamamos a la función de logout al hacer clic
              className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition"
            >
              <LogOut className="w-4 h-4" /> Cerrar sesión
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
