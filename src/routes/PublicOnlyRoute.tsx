import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";
import { jwtDecode } from "jwt-decode";
import { JSX } from "react";

type TokenPayload = {
  exp: number;
};

export default function PublicOnlyRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const token = authService.getToken();

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (!isExpired) {
        return <Navigate to="/dashboard" replace />;
      }
    } catch {
      console.error("Error inválido en el token de sesión.");
    }
  }

  return children;
}
