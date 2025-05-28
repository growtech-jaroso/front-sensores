/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { User } from "lucide-react";
import { authService } from "../../services/authService";
import { adminService } from "../../services/adminService";
import Layout from "../../layout/Layout";
import type { User as UserType } from "../../interfaces/User";
import type { Plantation } from "../../interfaces/Plantation";

export default function AdminDashboard() {
  const user = authService.getUserData();

  // Solo accesible si es admin
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/dashboard" />;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [plantations, setPlantations] = useState<Plantation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    adminService.getAllOwners().then((data) => {
      setUsers(data.data);
    });
  }, []);

  const handleUserClick = async (user: UserType) => {
    setSelectedUser(user);
    setLoading(true);
    const data = await adminService.getUserPlantations(user.id!);
    setPlantations(data);
    setLoading(false);
  };

  return (
    <Layout>
      <div className="h-full w-full overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 bg-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Lista de usuarios */}
          <div className="bg-white rounded-2xl shadow p-4 col-span-1">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-green-600" />
              Propietarios
            </h2>
            <ul className="space-y-2">
              {users.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleUserClick(user)}
                  className={`cursor-pointer px-4 py-2 rounded-lg border transition hover:bg-green-50 ${
                    selectedUser?.id === user._id ? "bg-green-100 border-green-400" : ""
                  }`}
                >
                  <div className="font-medium">{user.username}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </li>
              ))}
            </ul>
          </div>

          {/* Plantaciones */}
          <div className="bg-white rounded-2xl shadow p-4 md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">
              {selectedUser ? `Plantaciones de ${selectedUser.username}` : "Selecciona un usuario"}
            </h2>

            {loading ? (
              <p className="text-gray-500">Cargando plantaciones...</p>
            ) : (
              <ul className="divide-y">
                {plantations.map((p) => (
                  <li key={p.id} className="py-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-sm text-gray-600">{p.country}</div>
                  </li>
                ))}
                {selectedUser && plantations.length === 0 && (
                  <p className="text-gray-500">Este usuario no tiene plantaciones.</p>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
