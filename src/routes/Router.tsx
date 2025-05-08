import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import PrivateRoute from "./ProtectedRoutes";
import PublicOnlyRoute from "./PublicOnlyRoute";
import AdminRouter from "./AdminRouter";
import NotFound from "../pages/NotFound";

export default function AppRouter() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/"
        element={
          <PublicOnlyRoute>
            <Login />
          </PublicOnlyRoute>
        }
      />

      {/* Rutas protegidas */}
      <Route element={<PrivateRoute />}>
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
              <Profile />
            </Layout>
          }
        />
        {/* Rutas de administrador */}
        <Route path="/admin/*" element={<AdminRouter />} />
      </Route>

      {/* Ruta 404 - En caso que no exista ninguna de las anteriores */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
