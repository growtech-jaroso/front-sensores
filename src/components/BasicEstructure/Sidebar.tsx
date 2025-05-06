import { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { sidebarLinks } from "../Links/LinksSidebar";
import { Menu, X } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  useEffect(() => {
    sessionStorage.setItem("sidebar_open", isOpen.toString());
  }, [isOpen]);

  return (
    <>
      {/* Botón toggle */}
      <button
        onClick={toggle}
        className="fixed top-4 left-6 z-50 bg-gray-900 text-white p-2 rounded-full shadow-md hover:bg-gray-800 transition-transform duration-300 hover:rotate-90 focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white fixed inset-y-0 left-0 z-40 transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? "w-64" : "w-20"
        } flex flex-col justify-between shadow-lg`}
        role="navigation"
        aria-label="Sidebar"
      >
        {/* Logo + Título */}
        <Link to="/dashboard" className="flex flex-col items-center justify-center mt-18 mb-4 px-4 group relative">
          <div className="relative flex items-center justify-center">
            <span className="text-2xl text-green-400">🌿</span>
          </div>
          {isOpen && (
            <h2 className="text-2xl font-semibold text-green-400 tracking-tight transition-all duration-500 mt-2">
              GrowPanel
            </h2>
          )}
        </Link>

        {/* Navegación */}
        <nav
          className={`flex-1 flex flex-col gap-2 px-2 mt-2 transition-all duration-300 ${
            isOpen ? "items-start pl-6" : "items-center"
          }`}
        >
          {sidebarLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`relative group flex w-full items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-700 transition-all ${
                isOpen ? "justify-start" : "justify-center"
              }`}
            >
              <span className="text-gray-300">{item.icon}</span>

              {isOpen && (
                <span className="whitespace-nowrap transition-opacity duration-300 opacity-100">{item.label}</span>
              )}

              {!isOpen && (
                <span className="absolute left-full ml-2 whitespace-nowrap bg-black text-white text-sm px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-50">
                  {item.label}
                </span>
              )}
            </Link>
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
