import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "../layout/Layout";
import CreateUser from "../pages/admin/CreateUser";
import AdminDashboard from "../pages/admin";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]} />}>
        <Route
          index // La ruta por defecto para el admin
          element={
            <Layout>
              <AdminDashboard />
            </Layout>
          }
        />

        <Route
          path="configuracion"
          element={
            <Layout>
              <h2 className="text-xl">Configuración Admin</h2>
            </Layout>
          }
        />

        <Route
          path="crear-usuario"
          element={
            <Layout>
              <CreateUser />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
}
