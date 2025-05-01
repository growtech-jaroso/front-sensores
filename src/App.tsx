import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Perfil from "./pages/Profile"; //
import Login from "./pages/Login";
import Layout from "./layout/Layout";
import PrivateRoute from "./routes/ProtectedRoutes";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

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
                <Perfil />
              </Layout>
            }
          />
        </Route>

        {/* Página de inicio redirige a Login */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
