import { useLocation, useNavigate } from "react-router-dom";
import { Tabs } from '@/untitled-components/application/tabs/tabs';
import { Button } from "@/untitled-components/base/buttons/button";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar } from "@/untitled-components/base/avatar/avatar";
import "./Header.css"
import type { Key } from "react-aria-components";


export enum SelectedTab {
    DISCOVER = "Discover",
    SHELF = "My shelf",
    RECOMMENDATIONS = "Recommendations",

}

const tabRoutes = {
    shelf: "/bookshelf",
    discover: "/",
    recommendations: "/recommendations",
}

const tabs = [
    { id: "discover", label: SelectedTab.DISCOVER },
    { id: "shelf", label: SelectedTab.SHELF },
    { id: "recommendations", label: SelectedTab.RECOMMENDATIONS },
]

export const Header = () => {
    const { logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const selectedTab =
    location.pathname.startsWith("/bookshelf")
        ? "shelf"
        : location.pathname === "/recommendations"
          ? "recommendations"
          : "discover";

    async function signUserOut(){
        try {
            const token = sessionStorage.getItem("accessToken");
            const res = await fetch(`http://localhost:8000/my-bookshelf/logout`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }})
            if (res.status == 200){
                logout()

                navigate("/sign-in", {replace: true})
                window.history.replaceState(null, "", "/sign-in")
            }

            } catch (error) {
                console.error(error)
        }
    }

    function handleSelectTab(key: Key){
        if (typeof key === "string" && key in tabRoutes) {
            navigate(tabRoutes[key as keyof typeof tabRoutes])
        }
    }

    return (
        <div className="headers" >
            <div className="ms-20 header-content">
            <h1  className="app-name" style={{ fontWeight: "bold", fontSize: 20 }}>MyLibrary</h1>
            <Tabs selectedKey={selectedTab} onSelectionChange={handleSelectTab}>
            <Tabs.List items={tabs}>
                {(tab) => <Tabs.Item  {...tab} />}
            </Tabs.List>
            </Tabs>
            {/* <Button className="login-btn" onClick={() => navigate('/sign-in')}>Login</Button> */}
            <div className="flex items-center gap-4 me-4">
            <Button className="logout-btn" onClick={signUserOut}>Logout</Button> 
            <Button href="/profile" color="tertiary" size="sm" aria-label="View profile">
                <Avatar size="md" alt="Profile" initials="AN" />
            </Button>
            </div>
            </div>
        </div>
    )
}