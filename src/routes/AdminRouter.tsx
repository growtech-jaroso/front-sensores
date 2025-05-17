import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "../layout/Layout";
import CreateUser from "../pages/admin/CreateUser";
import AdminDashboard from "../pages/admin";
import UserTable from "../pages/admin/UserTable";
import EditUser from "../pages/admin/EditUser";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]} />}>
        <Route index element={<AdminDashboard />} />
        <Route
          path="configuracion"
          element={
            <Layout>
              <h2 className="text-xl">Configuración Admin</h2>
            </Layout>
          }
        />
        <Route path="usuarios" element={<UserTable />} />
        <Route path="crear-usuario" element={<CreateUser />} />
        <Route path="editar-usuario/:userId" element={<EditUser />} />
      </Route>
    </Routes>
  );
}
