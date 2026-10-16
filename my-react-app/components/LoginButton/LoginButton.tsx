import { useNavigate } from "react-router-dom"
import { Button } from "@fluentui/react-components"
import "./LoginButton.css"

export default function LoginButton() {
    let navigate = useNavigate()

    return (
        <>
        <Button className="login-btn" onClick={() => navigate('/sign-in')}>Login</Button>
        </>
    )
}