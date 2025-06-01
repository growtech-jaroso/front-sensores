/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { User as UserIcon, Search, ArrowDownAZ, ArrowUpAZ, Pencil, Leaf, MapPin, Info } from "lucide-react";
import { authService } from "../../services/authService";
import { adminService } from "../../services/adminService";
import Layout from "../../layout/Layout";
import Pagination from "../../components/Pagination/PaginationTable";
import type { User as UserType } from "../../interfaces/User";
import type { Plantation } from "../../interfaces/Plantation";

export default function AdminDashboard() {
  const user = authService.getUserData();

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);

  const [currentPlantationPage, setCurrentPlantationPage] = useState(1);
  const plantationsPerPage = 6;

  useEffect(() => {
    adminService.getAllOwners().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleUserClick = async (user: UserType) => {
    setSelectedUser(user);
    setLoading(true);
    const result = await adminService.getOwnersPlantations(user.id!);
    setPlantations(result.data);
    setCurrentPlantationPage(1);
    setLoading(false);
  };

  const filteredUsers = useMemo(() => {
    return users
      .filter((u) => {
        const username = u.username?.toLowerCase() || "";
        const email = u.email?.toLowerCase() || "";
        return username.includes(search.toLowerCase()) || email.includes(search.toLowerCase());
      })
      .sort((a, b) => {
        const nameA = a.username?.toLowerCase() || "";
        const nameB = b.username?.toLowerCase() || "";
        return sortAsc ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      });
  }, [users, search, sortAsc]);

  const paginatedPlantations = plantations.slice(
    (currentPlantationPage - 1) * plantationsPerPage,
    currentPlantationPage * plantationsPerPage
  );
  const totalPlantationPages = Math.ceil(plantations.length / plantationsPerPage);

  return (
    <Layout>
      <div className="h-full w-full px-4 py-6 sm:px-6 sm:py-8 bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Usuarios */}
          <aside className="bg-white rounded-xl shadow p-4 col-span-1">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-green-700 flex items-center gap-2">
                <UserIcon className="w-5 h-5" /> Propietarios
              </h2>
              <button
                onClick={() => setSortAsc(!sortAsc)}
                title={`Ordenar de ${sortAsc ? "Z–A" : "A–Z"}`}
                className="p-2 border rounded hover:bg-green-50"
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

            <div className="space-y-2 overflow-y-auto max-h-[600px] scrollbar-thin scrollbar-thumb-green-200">
              {filteredUsers.map((user) => {
                const isSelected = selectedUser?.id === user.id;
                return (
                  <div
                    key={user.id}
                    onClick={() => handleUserClick(user)}
                    className={`cursor-pointer p-3 rounded-lg border transition ${
                      isSelected
                        ? "bg-green-100 border-green-400 ring-2 ring-green-200"
                        : "hover:bg-green-50 border-gray-200"
                    }`}
                  >
                    <div className="font-medium text-sm text-gray-800">{user.username}</div>
                    <div className="text-xs text-gray-500">{user.email}</div>
                  </div>
                );
              })}
              {filteredUsers.length === 0 && <p className="text-sm text-gray-500 px-2">No se encontraron usuarios.</p>}
            </div>
          </aside>

          {/* Plantaciones */}
          <section className="bg-white rounded-xl shadow p-6 md:col-span-2">
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              {selectedUser
                ? `Plantaciones de ${selectedUser.username}`
                : "Selecciona un usuario para ver sus plantaciones"}
            </h2>

            {loading ? (
              <div className="grid gap-4 md:grid-cols-2 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-xl" />
                ))}
              </div>
            ) : selectedUser ? (
              plantations.length > 0 ? (
                <ul className="grid gap-4 md:grid-cols-2">
                  {paginatedPlantations.map((p) => (
                    <li
                      key={p.id}
                      className="group rounded-xl border p-4 hover:border-green-400 transition shadow-sm hover:shadow-md bg-gradient-to-br from-white to-green-50"
                    >
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700 flex items-center gap-2">
                          <Leaf className="w-4 h-4 text-green-600" /> {p.name}
                        </h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {p.country} — {p.province}, {p.city}
                        </p>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Info className="w-4 h-4 text-gray-400" /> Tipo: {p.type} | Estado: {p.status}
                        </p>
                      </div>
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => console.log("Editar plantación:", p.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-lg transition"
                        >
                          <Pencil className="w-4 h-4" /> Editar
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Este usuario no tiene plantaciones registradas.</p>
              )
            ) : null}

            <Pagination
              currentPage={currentPlantationPage}
              totalPages={totalPlantationPages}
              loading={loading}
              onPageChange={setCurrentPlantationPage}
            />
          </section>
        </div>
      </div>
    </Layout>
  );
}
