import { createContext, useContext, useState, ReactNode } from "react";

// Define interfaces for your data types
interface User {
  _id?: string;
  name?: string;
  email?: string;
  role?: string;
}

// Define the context type
interface GlobalContextType {
  user: User;
  updateUser: (user: User) => void;
}

// Create the context
 const GlobalContext = createContext<GlobalContextType>({
  user: {},
  updateUser: () => {},
});

// Create context provider component
const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] = useState<User>(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return JSON.parse(user);
    }
    return {};
  });
  const updateUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return (
    <GlobalContext.Provider value={{ user, updateUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the context
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
export default GlobalContextProvider;
