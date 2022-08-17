import { createContext, ReactNode, useState } from "react";

interface Context {
  token: string;
  setToken: (value: string) => void;
}

export const context = createContext<Context>({
  token: "",
  setToken: (value: string) => null,
});

export const ContextProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [token, setToken] = useState<string>("");

  return (
    <context.Provider value={{ token, setToken }}>{children}</context.Provider>
  );
};
