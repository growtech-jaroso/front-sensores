import { useState } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "../components/BasicEstructure/Sidebar";
import Header from "../components/BasicEstructure/Header";

type LayoutProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(() => {
    const stored = sessionStorage.getItem("sidebar_open");
    return stored === "true";
  });

  const hideHeader = location.pathname === "/perfil";

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />

      <div
        className={`flex flex-col flex-1 transition-[margin] duration-500 ease-out min-w-0 ${
          sidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        {!hideHeader && <Header />}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
