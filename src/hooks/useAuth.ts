import { useMemo } from "react";
import { useUser } from "../contexts/UserContext";

export function useAuth() {
  const { user } = useUser();

  const token = user?.token || "";

  const isAdmin = useMemo(() => user?.roles.includes("ADMIN") || false, [user]);
  const isSupport = useMemo(() => user?.roles.includes("SUPPORT") || false, [user]);
  const isUser = useMemo(() => user?.roles.includes("USER") || false, [user]);

  return {
    isAuthenticated: !!token,
    tokenExpired: false, 
    role: user?.roles?.[0] || null,
    roles: user?.roles || [],
    username: user?.name || "",
    email: user?.email || "",
    isAdmin,
    isSupport,
    isUser,
  };
}
