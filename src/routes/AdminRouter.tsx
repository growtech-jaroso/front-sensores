import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import Layout from "../layout/Layout";
import Configutation from "../pages/admin/Configutation";

export default function AdminRouter() {
  return (
    <Routes>
      <Route element={<ProtectedRoutes allowedRoles={["ADMIN"]} />}>
        <Route
          path="/admin/configuracion"
          element={
            <Layout>
              <Configutation />
            </Layout>
          }
        />
      </Route>
    </Routes>
  );
}
