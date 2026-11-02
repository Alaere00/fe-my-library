import { Navigate, useLocation, Outlet } from "react-router-dom"
import { useAuth } from "./contexts/AuthContext"
import { Header } from "./components/Header/Header"


export const ProtectedRoute =() => {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    return !isAuthenticated
        ? <Navigate to="/sign-in" replace state={{ from: location.pathname + location.search }} />
        : <><Header /><Outlet /></>
}