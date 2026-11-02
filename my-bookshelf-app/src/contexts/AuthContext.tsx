import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
    isAuthenticated: boolean;
    login: (accessToken: string, refreshToken: string) => void;
    updateTokens: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!sessionStorage.getItem("accessToken"));


    function saveTokens(accessToken: string, refreshToken: string) {
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem("refreshToken", refreshToken);
    }

    function login(accessToken: string, refreshToken: string) {
        saveTokens(accessToken, refreshToken);
        setIsAuthenticated(true)
    }

    function updateTokens(accessToken: string, refreshToken: string) {
        saveTokens(accessToken, refreshToken);
    }

    function logout() {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("refreshToken");
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, updateTokens, logout }} >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const ctx = useContext(AuthContext)
    if (!ctx) throw new Error("useAuth must be within AuthProvider");
    return ctx

}