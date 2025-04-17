import { useState } from "react";
import Sidebar from "../components/BasicEstructure/Sidebar";
import Header from "../components/BasicEstructure/Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar con el toggle y el efecto mejorado */}
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

      <div
        className={`flex-1 min-h-screen transition-all duration-500 ease-out ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`} // Efecto de transición
      >
        <Header />
        <main className="p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
}
