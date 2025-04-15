import Footer from "./Footer";
import { sidebarLinks } from "./SidebarLinks";
import { Menu, X } from "lucide-react";

type SidebarProps = {
  isOpen: boolean;
  toggle: () => void;
};

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  return (
    <>
      {/* Botón de toggle */}
      <button
        onClick={toggle}
        className="fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-full shadow-md hover:bg-gray-800 transition-all"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white h-screen p-6 fixed top-0 z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "w-64 left-0" : "w-0 -left-64"
        } flex flex-col justify-between`}
      >
        {/* Contenido del Sidebar */}
        <div className="flex-grow">
          {/* Encabezado del Sidebar */}
          <div className="flex items-center gap-2 mb-10 text-green-400 ml-10">
            <span className="text-2xl font-bold">🌿</span>
            {isOpen && (
              <h2 className="text-xl font-semibold tracking-tight">GrowPanel</h2>
            )}
          </div>

          {/* Navegación */}
          <nav className="space-y-2">
            {sidebarLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors ${
                  !isOpen ? "opacity-0 invisible" : "opacity-100 visible"
                }`}
              >
                <span className="text-gray-400">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </a>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <div className="text-center">
          <Footer />
        </div>
      </aside>
    </>
  );
}
