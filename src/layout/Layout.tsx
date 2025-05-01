import { useState, useEffect } from "react";
import Sidebar from "../components/BasicEstructure/Sidebar";
import Header from "../components/BasicEstructure/Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  // Sidebar colapsado por defecto (o recuperado desde localStorage)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebar_open");
    return saved === "true" || false;
  });

  // Actualizar localStorage cada vez que se cambia el estado
  useEffect(() => {
    localStorage.setItem("sidebar_open", String(sidebarOpen));
  }, [sidebarOpen]);

  return (
    <div className="flex">
      {/* Sidebar con toggle */}
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Contenedor principal */}
      <div
        className={`flex-1 min-h-screen transition-all duration-500 ease-out ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Header />
        <main className="p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
