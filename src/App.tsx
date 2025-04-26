import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PrivateRoute from "./routes/ProtectedRoutes";  

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas, solo accesibles si el usuario está autenticado */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Layout><Dashboard isSidebarOpen={false} /></Layout>} />
        </Route>

        {/* Página de inicio redirige a Login */}
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}
