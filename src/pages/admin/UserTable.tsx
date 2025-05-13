import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AlertDelete } from "../../components/Alert/AlertDelete";
import PaginationTable from "../../components/Pagination/PaginationTable";
import axiosClient from "../../api/axiosClient";
import UserTableHeader from "../../components/Admin/Users/UserTableHeader";
import UserSearchInputs from "../../components/Admin/Users/UserSearchInputs";
import UserTableBody from "../../components/Admin/Users/UserTableBody";
import {ErrorAlert} from "../../components/Alert/WarningAlert.tsx";
import Layout from "../../layout/Layout";

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
}

export default function UserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState({ username: "", email: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/users", {
        params: {
          page,
          limit: 10,
          username: search.username,
          email: search.email,
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setUsers(res.data.data.map((u: any) => ({ ...u, _id: u._id || u.id })));
      setTotalPages(res.data.meta.total_pages);
    } catch (err) {
      console.error("Error al cargar usuarios:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (userId: string) => {
    const confirmed = await AlertDelete();
    if (confirmed) {
      try {
        await axiosClient.delete(`/users/${userId}`);
        const updatedUsers = users.filter((u) => u._id !== userId);
        setUsers(updatedUsers);
        if (updatedUsers.length === 0 && page > 1) {
          setPage(page - 1);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_) {
        await ErrorAlert({
          title: "Error al eliminar usuario",
          text: "No se pudo eliminar el usuario. Intenta nuevamente.",
        })
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
    setPage(1);
  };

  return (
    <Layout>
      <div className="p-6">
        <UserTableHeader navigate={navigate} />
        <UserSearchInputs search={search} handleSearchChange={handleSearchChange} />

        <div className="overflow-x-auto rounded-xl shadow-md bg-white">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Nombre</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Correo</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-600">Rol</th>
                <th className="px-6 py-4 text-center font-semibold text-gray-600">Acciones</th>
              </tr>
            </thead>
            <AnimatePresence initial={false}>
              <UserTableBody users={users} onDelete={handleDelete} />
            </AnimatePresence>
          </table>
        </div>

        <PaginationTable currentPage={page} totalPages={totalPages} loading={loading} onPageChange={setPage} />
      </div>
    </Layout>
  );
}
