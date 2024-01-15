import React, { createContext, useState } from "react";
import User from "./interfaces/User";

interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType | null>(null);

type ContextProviderProps = {
    children: React.ReactNode;
};

export const UserContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const value = {
        user,
        setUser,
    };

    return (
        <UserContext.Provider value={value}>{children}</UserContext.Provider>
    );
}; 


