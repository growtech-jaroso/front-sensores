import { useMemo, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../contexts/UserContext";
import { authService } from "../services/authService";

type TokenPayload = {
  exp: number;
  iat: number;
  sub: string;
  username: string;
  email: string;
};

export function useAuth() {
  const { user } = useUser();
  const [expired, setExpired] = useState(false);

  const token = user?.token || "";

  const isAdmin = useMemo(() => user?.roles.includes("ADMIN") || false, [user]);
  const isSupport = useMemo(() => user?.roles.includes("SUPPORT") || false, [user]);
  const isUser = useMemo(() => user?.roles.includes("USER") || false, [user]);

  // Verificar si el token expiró
  useEffect(() => {
    if (!token) return;

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const isExpired = decoded.exp * 1000 < Date.now();
      setExpired(isExpired);

      if (isExpired) {
        authService.logout();
      }
    } catch {
      console.warn("Token inválido o corrupto.");
      setExpired(true);
      authService.logout();
    }
  }, [token]);

  return {
    isAuthenticated: !!token && !expired,
    tokenExpired: expired,
    role: user?.roles?.[0] || null,     
    roles: user?.roles || [],
    username: user?.name || "",
    email: user?.email || "",
    isAdmin,
    isSupport,
    isUser,
  };
}
