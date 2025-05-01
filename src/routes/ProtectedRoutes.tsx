import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authService } from "../services/authService";

type Props = {
  allowedRoles?: ("ADMIN" | "SUPPORT" | "USER")[];
};

export default function ProtectedRoutes({ allowedRoles }: Props) {
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();
  const location = useLocation();

  // No autenticado → redirige
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Autenticado, pero no tiene permisos
  if (allowedRoles && !allowedRoles.includes(userRole as any)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Autenticado y permitido
  return <Outlet />;
}
