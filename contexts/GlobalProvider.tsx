import React, { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "@lib/appwrite";

interface GlobalContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  user: any;
  setIsLoggedIn: (e: boolean) => void;
  setUser: (e: any) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error("GlobalContext must be used within a GlobalProvider");
  return context;
};

export default function GlobalProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect (() => {
    getCurrentUser()
      .then((res) => {
        if(res) {
          setIsLoggedIn(true);
          setUser(res);
        } else {
          setIsLoggedIn(false);
          setUser(null);
        }
      })
      .catch((err) => {
      console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  return (
    <GlobalContext.Provider value={{
      isLoggedIn, setIsLoggedIn, isLoading, user, setUser
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
