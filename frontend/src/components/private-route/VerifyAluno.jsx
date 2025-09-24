import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../axiosConfig/axios";

export function VerifyAluno({ children }) {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    async function checkUser() {
        try {
            const id = localStorage.getItem("id") || sessionStorage.getItem("id");
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");

            if (!id || !token) {
                navigate("/");
                return;
            }

            const response = await api.get(`/user/logged/${id}`, {
                headers: { "x-access-token": token }
            });

            if (response.data.role === "aluno") {
                setIsAuthorized(true);
            } else {
                throw new Error("Sem permissão");
            }
        } catch (error) {
            toast.error("Sessão expirada ou alguem logou na sua conta. Faça login novamente.");
            localStorage.clear();
            sessionStorage.clear();
            navigate("/");
        }
    }

    useEffect(() => {
        checkUser();
        // verifica a cada 15 segundos
        const interval = setInterval(() => {
            checkUser();
        }, 15000);

        return () => clearInterval(interval);
    }, [navigate]);

    return isAuthorized ? children : null;
}
