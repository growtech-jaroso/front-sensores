import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import CreateUser from "../pages/admin/CreateUser";
import AdminDashboard from "../pages/admin/AdminDashboard.tsx";
import UserTable from "../pages/admin/UserTable";
import EditUser from "../pages/admin/EditUser";
import AdminIndex from "../pages/admin/AdminIndex.tsx";
import EditPlantation from "../pages/EditPlantation.tsx";
import NotFound from "../pages/NotFound.tsx";
import CreatePlantation from "../pages/admin/CreatePlantation.tsx";
import CreateDevice from "../pages/admin/CreateDevice.tsx";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]} />}>
        <Route path="panel" element={<AdminDashboard />} />
        <Route path="usuarios" element={<UserTable />} />
        <Route path="crear-usuario" element={<CreateUser />} />
        <Route path="editar-usuario/:userId" element={<EditUser />} />
        <Route path="editar-plantacion/:plantationId" element={<EditPlantation />} />
        <Route path="crear-plantacion" element={<CreatePlantation />} />
        <Route path="crear-dispositivo/:plantationId" element={<CreateDevice />} />
      </Route>
      <Route element={<ProtectedRoutes allowedRoles={["ADMIN", "SUPPORT"]} />}>
        <Route path="dashboard" element={<AdminIndex />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
