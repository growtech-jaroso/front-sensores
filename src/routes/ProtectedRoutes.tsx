import { Navigate, Outlet } from "react-router-dom";
import { authService } from "../services/authService";  

const PrivateRoute = () => {
  const isAuthenticated = authService.isAuthenticated();  // Verifica si el token existe en sessionStorage

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;  // Si no está autenticado, redirige a la página de login
  }

  return <Outlet />;  // Si está autenticado, renderiza las rutas protegidas
};

export default PrivateRoute;
