import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../services/authService";

type User = {
  name: string;
  email: string;
  roles: string[];
  token: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Leer desde sessionStorage al cargar
  useEffect(() => {
    const data = authService.getUserData();
    if (data) {
      setUser(data);
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
