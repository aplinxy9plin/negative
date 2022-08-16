import React, { useState } from "react";

type ContextType = {
  token: string;
  setToken: (token: string) => void;
};

export const Context = React.createContext<ContextType>({
  token: "",
  setToken: (token: string) => {},
});

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const context = {
    token,
    setToken: (token: string) => {
      setToken(token);
      localStorage.setItem("token", token);
    },
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export default AppProvider;
