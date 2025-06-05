import { useEffect, useState, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { User as UserIcon, Search, ArrowDownAZ, ArrowUpAZ } from "lucide-react";
import { adminService } from "../../services/adminService";
import Layout from "../../layout/Layout";
import Pagination from "../../components/Pagination/PaginationTable";
import type { User as UserType } from "../../interfaces/User";
import type { Plantation } from "../../interfaces/Plantation";
import { IndicatorStatus } from "../../types/indicatorStatus";
import { PlantationCard } from "../../components/Admin/Plantation/PlantationCard";
import useUser from "../../hooks/useUser.tsx";
import axiosClient from "../../api/axiosClient.ts";
import {ErrorAlert} from "../../components/Alert/WarningAlert.tsx";
import {AlertDelete} from "../../components/Alert/AlertDelete.tsx";

export default function AdminDashboard() {
  const {user} = useUser()

  const [users, setUsers] = useState<UserType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortAsc, setSortAsc] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("TOTAL");
  const [plantationSearch, setPlantationSearch] = useState("");

  const [currentPlantationPage, setCurrentPlantationPage] = useState(1);
  const plantationsPerPage = 6;

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

  const filteredPlantations = useMemo(() => {
    let filtered = plantations;
    if (statusFilter !== "TOTAL") {
      filtered = filtered.filter((p) => p.status === statusFilter);
    }
    if (plantationSearch.trim() !== "") {
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(plantationSearch.toLowerCase()));
    }
    return filtered;
  }, [plantations, statusFilter, plantationSearch]);

  const paginatedPlantations = filteredPlantations.slice(
    (currentPlantationPage - 1) * plantationsPerPage,
    currentPlantationPage * plantationsPerPage
  );
  const totalPlantationPages = Math.ceil(filteredPlantations.length / plantationsPerPage);

  const handleDeletePlantation = async (plantation: Plantation) => {
    const confirmed = await AlertDelete();
    if (!confirmed) return
    try {
      await axiosClient.delete(`/plantations/${plantation.id}`)
      await handleUserClick(selectedUser!)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      await ErrorAlert({
        title: "Error al eliminar la plantación",
        text: "No se pudo eliminar la plantación. Intenta nuevamente.",
      });
    }
  }

  useEffect(() => {
    adminService.getAllOwners().then((res) => {
      setUsers(res.data);
    });
  }, []);

  if (!user || !["ADMIN", "SUPPORT"].includes(user.role)) {
    return <Navigate to="/dashboard" />;
  }

  const handleUserClick = async (user: UserType) => {
    setSelectedUser(user);
    setLoading(true);
    const result = await adminService.getOwnersPlantations(user.id!);
    setPlantations(result.data);
    setCurrentPlantationPage(1);
    setLoading(false);
  };

  return (
    <Layout>
      <style>
        {`
          @keyframes fadeInSlow {
            0% { opacity: 0; transform: translateY(12px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeInSlow {
            animation: fadeInSlow 0.5s ease-out;
          }
        `}
      </style>
      <div className="animate-fadeInSlow min-h-screen w-full px-4 py-6 sm:px-6 sm:py-8 bg-gradient-to-tr from-green-50 to-white">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="bg-white rounded-2xl shadow-lg p-4 w-full lg:w-1/3 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-green-700 flex items-center gap-2">
                <UserIcon className="w-5 h-5" /> Propietarios
              </h2>
              <button
                onClick={() => setSortAsc(!sortAsc)}
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
              {filteredUsers.map((user) => {
                const isSelected = selectedUser?.id === user.id;
                return (
                  <div
                    key={user.id}
                    onClick={() => handleUserClick(user)}
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
              {filteredUsers.length === 0 && <p className="text-sm text-gray-500 px-2">No se encontraron usuarios.</p>}
            </div>
          </aside>

          {/* Plantaciones */}
          <section className="bg-white rounded-2xl shadow-lg p-6 w-full lg:w-2/3 border border-gray-200">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                {selectedUser
                  ? `🌱 Plantaciones de ${selectedUser.username}`
                  : "Selecciona un propietario para ver sus plantaciones"}
              </h2>
              {/* Filtros */}
              <div className="flex flex-wrap gap-2 mb-4">
                {[IndicatorStatus.TOTAL, IndicatorStatus.ONLINE, IndicatorStatus.OFFLINE].map((status) => (
                  <button
                    key={status}
                    onClick={() =>
                      setStatusFilter(
                        Object.keys(IndicatorStatus).find(
                          (k) => IndicatorStatus[k as keyof typeof IndicatorStatus] === status
                        ) || "TOTAL"
                      )
                    }
                    className={`px-4 py-1.5 text-sm font-medium rounded-full border transition ${
                      statusFilter ===
                      Object.keys(IndicatorStatus).find(
                        (k) => IndicatorStatus[k as keyof typeof IndicatorStatus] === status
                      )
                        ? "bg-green-600 text-white border-green-600 shadow"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {/* Buscador de plantaciones */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  value={plantationSearch}
                  onChange={(e) => setPlantationSearch(e.target.value)}
                  placeholder="Buscar plantación..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            </div>

            {loading ? (
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded-xl" />
                ))}
              </div>
            ) : selectedUser ? (
              filteredPlantations.length > 0 ? (
                <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
                  {paginatedPlantations.map((p) => (
                    <PlantationCard
                      handleDeleteClick={handleDeletePlantation}
                      key={p.id}
                      plantation={p}
                    />
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
