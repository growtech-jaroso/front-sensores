import { Mail, UserRound } from "lucide-react";

type Props = {
  search: { username: string; email: string; role: string };
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};

export default function UserSearchInputs({ search, handleSearchChange }: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative w-full sm:w-64">
        <UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          name="username"
          placeholder="Buscar por nombre"
          value={search.username}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="relative w-full sm:w-64">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          name="email"
          placeholder="Buscar por correo"
          value={search.email}
          onChange={handleSearchChange}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-green-400"
        />
      </div>
      <div className="w-full sm:w-64">
        <select
          name="role"
          value={search.role}
          onChange={handleSearchChange}
          className="w-full pl-4 pr-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-green-400"
        >
          <option value="">Todos los roles</option>
          <option value="ADMIN">Administrador</option>
          <option value="SUPPORT">Soporte</option>
          <option value="USER">Usuario</option>
        </select>
      </div>
    </div>
  );
}
