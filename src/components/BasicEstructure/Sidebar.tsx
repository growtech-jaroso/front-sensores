import Footer from "./Footer";
import { sidebarLinks } from "../Links/LinksSidebar";
import { Menu, X } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  return (
    <>
      {/* Botón toggle */}
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-full shadow-md hover:bg-gray-800 transition-all"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white h-screen fixed top-0 z-40 transition-all duration-500 ease-in-out transform
        ${isOpen ? "w-64" : "w-20"} flex flex-col justify-between`}
      >
        {/* Encabezado con ícono de planta y título GrowPanel */}
        <div className="flex flex-col items-center justify-center mt-12 mb-6 px-4 space-y-2">
          {/* Solo mostrar el título cuando el sidebar está abierto */}
          <div
            className={`flex items-center gap-2 transition-all duration-500 ease-in-out transform ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"
            }`}
          >
            <span className="text-2xl text-green-400">🌿</span>
          </div>

          {/* Título GrowPanel debajo del ícono */}
          <h2
            className={`text-xl font-semibold text-green-400 tracking-tight transition-all duration-500 ease-in-out transform ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"
            }`}
          >
            GrowPanel
          </h2>
        </div>

        {/* Navegación (Menú de enlaces) */}
        <nav className="flex-1 space-y-4 px-2">
          {sidebarLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {/* Mostrar el ícono correspondiente */}
              <span className="text-gray-400">{item.icon}</span>
              {/* Solo mostrar el texto de la etiqueta cuando el sidebar está abierto */}
              <span
                className={`transition-all duration-500 ease-in-out transform ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-[-50px]"
                }`}
              >
                {item.label}
              </span>
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div className={`px-4 pb-4 text-ce text-center ${!isOpen && "hidden"}`}>
          <Footer />
        </div>
      </aside>
    </>
  );
}
