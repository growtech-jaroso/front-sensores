import { useEffect } from "react";
import Footer from "./Footer";
import { sidebarLinks } from "../Links/LinksSidebar";
import { Menu, X } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  // Guardar el estado en sessionStorage
  useEffect(() => {
    sessionStorage.setItem("sidebar_open", isOpen.toString());
  }, [isOpen]);

  return (
    <>
      {/* Botón toggle */}
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-full shadow-md hover:bg-gray-800 transition-transform duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar principal */}
      <aside
        className={`bg-gray-800 text-white fixed inset-y-0 left-0 z-40 transition-all duration-500 ease-in-out overflow-hidden
          ${isOpen ? "w-64" : "w-20"} flex flex-col justify-between shadow-lg`}
        role="navigation"
        aria-label="Sidebar"
      >
        {/* Logo y título */}
        <a href="/dashboard" className="flex flex-col items-center justify-center mt-18 mb-6 px-4 group relative">
          <div className="relative flex items-center justify-center">
            <span className="text-3xl text-green-400">🌿</span>
          </div>

          {isOpen && (
            <h2 className="text-2xl font-semibold text-green-400 tracking-tight transition-all duration-500">
              GrowPanel
            </h2>
          )}
        </a>

        {/* Navegación */}
        <nav className="flex-1 space-y-2 px-2">
          {sidebarLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="relative group flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300"
            >
              <span className="text-gray-300">{item.icon}</span>
              <span
                className={`whitespace-nowrap transition-all duration-300 transform ${
                  isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`}
              >
                {item.label}
              </span>

              {!isOpen && (
                <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {item.label}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="px-4 pb-4 text-center">
            <Footer />
          </div>
        )}
      </aside>
    </>
  );
}
