import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { sidebarLinks } from "../Links/LinksSidebar";
import Footer from "./Footer";

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
      {/* Overlay móvil suave */}
      {isOpen && <div className="fixed inset-0 bg-white/20 backdrop-blur-sm z-30 md:hidden" onClick={toggle} />}

      <aside
        className={`fixed top-0 left-0 z-40 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl flex flex-col
        transition-all duration-300 ease-in-out overflow-x-hidden
        ${isOpen ? "w-64" : "w-20"}`}
        role="navigation"
      >
        {/* Toggle + Logo */}
        <div className="flex flex-col gap-3 px-4 pt-4 pb-2">
          <button
            onClick={toggle}
            className="bg-gray-900 text-white p-2 rounded-full hover:bg-green-500 hover:text-white transition duration-300 focus:outline-none w-fit"
            aria-label="Alternar menú lateral"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <Link
            to="/dashboard"
            className={`flex items-center hover:bg-gray-700 transition rounded-md ${
              isOpen ? "gap-2 py-2 px-2" : "justify-center py-3"
            }`}
          >
            <span className="text-2xl">🌿</span>
            {isOpen && <span className="text-green-400 font-semibold text-xl truncate">GrowPanel</span>}
          </Link>
        </div>

        {/* Navegación */}
        <nav
          className={`flex-1 px-2 py-4 space-y-1 ${
            isOpen ? "overflow-y-auto" : "overflow-hidden"
          } relative overflow-x-hidden`}
        >
          {sidebarLinks.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`relative flex items-center gap-6 px-3 py-2 rounded-lg transition-all duration-200
              ${isOpen ? "justify-start" : "justify-center group"} 
              w-full overflow-hidden hover:bg-gray-700 hover:text-green-400`}
            >
              <span className="text-lg">{item.icon}</span>

              {isOpen && <span className="whitespace-nowrap">{item.label}</span>}

              {!isOpen && (
                <span
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 bg-black text-white text-xs px-2 py-1 rounded 
                  opacity-0 group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap pointer-events-none max-w-xs overflow-hidden text-ellipsis"
                >
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        {isOpen && (
          <div className="shrink-0 border-t border-gray-700 px-4 py-3">
            <Footer />
          </div>
        )}
      </aside>
    </>
  );
}
