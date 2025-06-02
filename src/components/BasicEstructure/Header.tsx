import { Bell, LineChart, Pencil } from "lucide-react";
import UserMenu from "../User/UserMenu";
import { useState, useEffect } from "react";

type HeaderProps = {
  titulo?: string;
  pathname?: string;
};

export default function Header({ titulo = "", pathname = "" }: HeaderProps) {
  const isDashboard = pathname === "/dashboard";
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(titulo);

  useEffect(() => {
    if (isDashboard) {
      const saved = localStorage.getItem("dashboard_title");
      if (saved) setTitle(saved);
    } else {
      setTitle(titulo);
    }
  }, [titulo, pathname, isDashboard]);

  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3 text-gray-800">
        <LineChart className="w-6 h-6 text-green-600" />

        {editing ? (
          <div className="flex items-center gap-2">
            <input
              className="border border-gray-300 rounded px-2 py-1 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
            <button
              onClick={() => {
                const finalTitle = title.trim() === "" ? "Dashboard" : title.trim();
                setTitle(finalTitle);
                localStorage.setItem("dashboard_title", finalTitle);
                setEditing(false);
              }}
              className="text-sm text-blue-600 hover:underline"
            >
              Guardar
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            {isDashboard && (
              <button
                onClick={() => setEditing(true)}
                className="p-1 rounded-full hover:bg-gray-100 transition"
                title="Editar título"
              >
                <Pencil size={18} className="text-gray-500 hover:text-black" />
              </button>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button className="relative hover:bg-gray-100 p-2 rounded-full transition">
          <Bell className="w-5 h-5 text-gray-700" />
        </button>

        <UserMenu />
      </div>
    </header>
  );
}
