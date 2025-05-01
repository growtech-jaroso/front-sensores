import { Navigate, Outlet, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { authService } from "../services/authService";

type Props = {
  allowedRoles?: ("ADMIN" | "SUPPORT" | "USER")[];
};

type TokenPayload = {
  exp: number;
};

export default function ProtectedRoutes({ allowedRoles }: Props) {
  const location = useLocation();
  const user = authService.getUserData();
  const token = user?.token;

  // Verificar autenticación y expiración
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const expired = decoded.exp * 1000 < Date.now();
      isAuthenticated = !expired;
      if (expired) authService.logout();
    } catch {
      isAuthenticated = false;
      authService.logout();
    }
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Verificar permisos por roles
  if (
    allowedRoles &&
    !allowedRoles.some((role) => user?.roles.includes(role))
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
