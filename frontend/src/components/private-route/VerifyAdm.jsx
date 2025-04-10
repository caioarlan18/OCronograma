import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import api from "../../axiosConfig/axios";

export function VerifyAdm({ children }) {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        async function checkUser() {
            try {
                const id = localStorage.getItem("id") || sessionStorage.getItem("id");

                if (!id) {
                    toast.error("Faça login");
                    navigate("/");
                    return;
                }

                const response = await api.get(`/user/read/${id}`);
                const role = response.data.role;

                if (role === "adm" || role === "adm2") {
                    setIsAuthorized(true);
                } else {
                    toast.error("Você não tem permissão para entrar");
                    navigate("/");
                }

            } catch (error) {
                toast.error("Erro ao verificar permissão");
                navigate("/");
            }
        }

        checkUser();
    }, [navigate]);


    return isAuthorized ? children : null;
}
