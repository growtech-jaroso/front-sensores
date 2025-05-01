import { Layout } from "lucide-react";
import { Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import ProfileLayout from "../components/User/Profile/ProfileLayout";

<>
  <Route element={<ProtectedRoutes />}>
    {/* Rutas para cualquier usuario autenticado */}
    <Route
      path="/dashboard"
      element={
        <Layout>
          <Dashboard isSidebarOpen={false} />
        </Layout>
      }
    />
    <Route
      path="/perfil"
      element={
        <Layout>
          <ProfileLayout children={undefined} />
        </Layout>
      }
    />
  </Route>
  <Route element={<ProtectedRoutes allowedRoles={["ADMIN", "SUPPORT"]} />}>
    <Route path="/admin/personal" element={<Layout>GESTIÓN</Layout>} />
  </Route>
</>;
