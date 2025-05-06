import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Layout from "../layout/Layout";
import PrivateRoute from "./ProtectedRoutes";
import PublicOnlyRoute from "./PublicOnlyRoute";

export default function AppRouter() {
  return (
    <Routes>
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
      </Route>
    </Routes>
  );
}
