import { LoginCredentials, LoginResponse } from "@/components/types/Auth";
import { createContext, useContext, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem("accessToken"));


    function login(accessToken: string){
        sessionStorage.setItem("accessToken", accessToken);
        setIsAuthenticated(true)
}


    function logout() {
        sessionStorage.removeItem("accessToken")
        setIsAuthenticated(true)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }} >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be within AuthProvider");
    return ctx

}