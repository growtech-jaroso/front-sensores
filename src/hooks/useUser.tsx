import {useContext} from "react";
import UserContext from "../contexts/UserContext.tsx";

const useUser = () => {
  const userContext = useContext(UserContext)

  if (!userContext) {
    throw new Error("No se ha inicializado el contexto de usuario");
  }

  return userContext;
};

export default useUser;