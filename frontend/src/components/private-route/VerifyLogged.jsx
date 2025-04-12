import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
export function VerifyLogged({ children }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(true);
    useEffect(() => {
        async function verifyLogged() {
            const id = localStorage.getItem("id") || sessionStorage.getItem("id");
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!id || !token) {
                setIsAuth(false);
            } else {
                navigate("/redirecionamento")

            }
        }
        verifyLogged();
    }, [])
    return !isAuth ? children : null;
}