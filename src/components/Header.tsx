import { Bell, User, LineChart } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3 text-gray-800">
        <LineChart className="w-6 h-6 text-green-600" />
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative hover:bg-gray-100 p-2 rounded-full transition">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded-full transition">
          <User className="w-5 h-5 text-gray-700" />
          <span className="text-sm text-gray-800 font-medium">Usuario</span>
        </div>
      </div>
    </header>
  );
}
