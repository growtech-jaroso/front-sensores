import { Bell, LineChart } from "lucide-react";
import UserMenu from "../User/UserMenu";

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
        </button>

        <UserMenu />
      </div>
    </header>
  );
}

