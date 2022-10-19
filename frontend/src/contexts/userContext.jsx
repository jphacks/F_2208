import { createContext, useCallback, useState } from "react";

export const userContext = createContext();

export const useUser = () => {
  const [user, setter] = useState();
  const setUser = useCallback((data) => {
    setter(data);
  }, []);
  return { user, setUser };
};
