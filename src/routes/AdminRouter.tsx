import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import CreateUser from "../pages/admin/CreateUser";
import PanelIndex from "../pages/admin/Panel_index";
import UserTable from "../pages/admin/UserTable";
import EditUser from "../pages/admin/EditUser";
import AdminDashboard from "../pages/admin/AdminDashboard";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]} />}>
        <Route path="panel" element={<PanelIndex />} />
        <Route path="usuarios" element={<UserTable />} />
        <Route path="crear-usuario" element={<CreateUser />} />
        <Route path="editar-usuario/:userId" element={<EditUser />} />
        <Route path="editar-plantacion/:plantationId" element={<h1>Editar plantación</h1>} />
      </Route>
      <Route element={<ProtectedRoutes allowedRoles={["ADMIN", "SUPPORT"]} />}>
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}
