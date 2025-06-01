import { ReactNode, useEffect, useState } from "react";
import { User } from "../interfaces/User.ts";
import { authService } from "../services/authService.ts";
import UserContext from "../contexts/UserContext.tsx";

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = authService.getUserData();
    if (stored) {
      setUser(stored);
    }
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export default UserProvider;
