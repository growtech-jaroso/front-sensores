import { ArrowDownAZ, ArrowUpAZ, Search, User as UserIcon } from "lucide-react";
import type { User as UserType } from "../../../interfaces/User";

interface UserListProps {
  users: UserType[];
  selectedUser: UserType | null;
  onSelect: (user: UserType) => void;
  search: string;
  setSearch: (value: string) => void;
  sortAsc: boolean;
  toggleSort: () => void;
}

export default function UserList({
  users,
  selectedUser,
  onSelect,
  search,
  setSearch,
  sortAsc,
  toggleSort,
}: UserListProps) {
  return (
    <aside className="bg-white rounded-2xl shadow-lg p-4 w-full lg:w-1/3 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-green-700 flex items-center gap-2">
          <UserIcon className="w-5 h-5" /> Propietarios
        </h2>
        <button
          onClick={toggleSort}
          title={`Ordenar de ${sortAsc ? "Z–A" : "A–Z"}`}
          className="p-2 border rounded hover:bg-green-100"
        >
          {sortAsc ? (
            <ArrowDownAZ className="w-4 h-4 text-green-600" />
          ) : (
            <ArrowUpAZ className="w-4 h-4 text-green-600" />
          )}
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar propietario..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
        />
      </div>

      <div className="space-y-2">
        {users.map((user) => {
          const isSelected = selectedUser?.id === user.id;
          return (
            <div
              key={user.id}
              onClick={() => onSelect(user)}
              className={`cursor-pointer p-3 rounded-lg border flex flex-col transition ${
                isSelected
                  ? "bg-green-100 border-green-400 ring-2 ring-green-200"
                  : "hover:bg-green-50 border-gray-200"
              }`}
            >
              <span className="font-medium text-sm text-gray-800">{user.username}</span>
              <span className="text-xs text-gray-500">{user.email}</span>
            </div>
          );
        })}
        {users.length === 0 && (
          <p className="text-sm text-gray-500 px-2">No se encontraron usuarios.</p>
        )}
      </div>
    </aside>
  );
}
