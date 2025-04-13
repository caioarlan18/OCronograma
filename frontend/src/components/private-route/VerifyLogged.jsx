import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../axiosConfig/axios";

export function VerifyLogged({ children }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(true);

    useEffect(() => {
        async function verifyLogged() {
            try {
                const id = localStorage.getItem("id") || sessionStorage.getItem("id");
                const token = localStorage.getItem("token") || sessionStorage.getItem("token");

                if (!id || !token) {
                    setIsAuth(false);
                    return;
                }

                const response = await api.get(`/user/read/${id}`);

                if (!response || !response.data) {
                    localStorage.removeItem("id");
                    localStorage.removeItem("token");
                    sessionStorage.removeItem("id");
                    sessionStorage.removeItem("token");
                    setIsAuth(false);
                    return;
                }

                setIsAuth(true);
                navigate("/redirecionamento");

            } catch (error) {
                toast.error(error.response ? error.response.data.msg : "Erro desconhecido");
                localStorage.removeItem("id");
                localStorage.removeItem("token");
                sessionStorage.removeItem("id");
                sessionStorage.removeItem("token");
                setIsAuth(false);
            }
        }

        verifyLogged();
    }, [navigate]);

    return !isAuth ? children : null;
}
