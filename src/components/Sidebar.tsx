import {
    LayoutDashboard,
    Clock,
    Settings,
    Leaf,
  } from "lucide-react";
  
  export default function Sidebar() {
    return (
      <aside className="w-64 bg-gray-900 text-gray-100 h-screen p-6 fixed top-0 left-0 flex flex-col justify-between shadow-lg">
        <div>
          <div className="flex items-center gap-2 mb-10 text-green-400">
            <Leaf className="w-6 h-" />
            <h2 className="text-2xl font-semibold tracking-tight">GrowTechPanel</h2>
          </div>
  
          <nav className="space-y-2 text-md font-bold">
            <NavItem icon={<LayoutDashboard />} label="Dashboard" />
            <NavItem icon={<Clock />} label="Historial" />
            <NavItem icon={<Settings />} label="Configuración" />
          </nav>
        </div>
  
        <div className="text-xs text-gray-500 text-center">
          © {new Date().getFullYear()} AgroTech
        </div>
      </aside>
    );
  }
  
  function NavItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
      <a
        href="#"
        className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors"
      >
        <span className="text-gray-400">{icon}</span>
        <span>{label}</span>
      </a>
    );
  }
  