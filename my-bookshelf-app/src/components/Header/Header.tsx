import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Tabs } from '@/untitled-components/application/tabs/tabs';
import { Button } from "@/untitled-components/base/buttons/button";
import { useAuth } from "@/contexts/AuthContext";
import "./Header.css"


export enum SelectedTab {
    DISCOVER = "Discover",
    SHELF = "My shelf",
    TITLE = "Lists",

}

const tabs = Object.entries(SelectedTab).map(([name, value]) => ({
    id: name.toLowerCase(), 
    label: value
}))

export const Header = () => {
    const { logout } = useAuth()
    const [tabSelection, setTabSelection] = useState()
    const navigate = useNavigate()

    function handleSelection () {
    }

    return (
        <div className="headers" >
            <div className="header-content">
            <h1  className="app-name" style={{ fontWeight: "bold", fontSize: 20 }}>MyLibrary</h1>

            <Tabs onSelectionChange={() => {}}>
            <Tabs.List items={tabs}>
                {(tab) => <Tabs.Item  {...tab} />}
            </Tabs.List>
            </Tabs>
            {/* <Button className="login-btn" onClick={() => navigate('/sign-in')}>Login</Button> */}
            <Button className="logout-btn" onClick={logout}>Logout</Button> 
            </div>
        </div>
    )
}