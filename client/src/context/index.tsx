// context.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { updateToken } from "@/api/client";

// Issue: The current implementation doesn't persist the user state across page reloads.
// When the page is refreshed, the user state is reset to null, causing the user to be logged out.
// To fix this, we need to initialize the user state from localStorage if available.

// Define your User type
interface User {
  id: string;
  email: string;
  role: string;
  name: string;
}

interface GlobalContextType {
  user: User | null;
  isLoggedIn: boolean;
  updateUser: (user: User | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

// Create the context
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage if available
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    // Initialize from localStorage if available
    return localStorage.getItem("jwt_token");
  });
  const isLoggedIn = !!user;

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  // Update token whenever it changes
  useEffect(() => {
    updateToken(token);
  }, [token]);

  return (
    <GlobalContext.Provider
      value={{
        user,
        isLoggedIn,
        updateUser,
        token,
        setToken,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the global context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
