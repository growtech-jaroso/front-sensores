import { useMemo } from "react";
import useUser from "./useUser.tsx";

export function useAuth() {
  const { user } = useUser();

  const token = user?.token || "";

  const isAdmin = useMemo(() => user?.role === "ADMIN" || false, [user]);
  const isSupport = useMemo(() => user?.role === "SUPPORT" || false, [user]);
  const isUser = useMemo(() => user?.role === "USER" || false, [user]);

  return {
    isAuthenticated: !!token,
    tokenExpired: false, 
    role: user?.role || null,
    username: user?.username || "",
    email: user?.email || "",
    isAdmin,
    isSupport,
    isUser,
  };
}
