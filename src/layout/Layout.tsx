import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/BasicEstructure/Sidebar";
import Header from "../components/BasicEstructure/Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  // Sidebar SIEMPRE cerrado al entrar a una nueva ruta
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Ocultar el Header en /perfil
  const hideHeader = location.pathname === "/perfil";

  // Siempre colapsar el sidebar al cambiar de ruta
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        toggle={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Contenido principal */}
      <div
        className={`flex-1 min-h-screen transition-all duration-500 ease-out ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {!hideHeader && <Header />}
        <main className="p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
