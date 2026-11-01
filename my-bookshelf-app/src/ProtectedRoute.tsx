import { Navigate, useLocation, Outlet } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"


export const ProtectedRoute =() => {
    const { isAuthenticated } = useAuth()
    return !isAuthenticated ? <Navigate to="/sign-in" replace state={{ from: location.pathname + location.search}}/>: <Outlet/>
}