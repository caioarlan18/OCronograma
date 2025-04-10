import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import api from "../../axiosConfig/axios";
import { useNavigate } from "react-router-dom";
export function PainelAluno() {
    const navigate = useNavigate();
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function getUserData() {
            try {
                const response = await api.get(`/user/read/${id}`);
                setUser(response.data);
            } catch (error) {
                toast.error(error);
            }
        }
        getUserData();
    }, [id])

    useEffect(() => {
        if (!user || !user.role) return;
        if (user.role === "adm" || user.role === "adm2") {
            return navigate("/painel-adm-feed")
        } else if (user.role === "aluno") {
            return;
        }
        else {
            toast.error("Cargo inválido, entre em contato com um administrador");
            localStorage.removeItem("id");
            localStorage.removeItem("token");
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("token");
            navigate("/")
        }
    }, [user])

    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        toast.success("Até logo! Você saiu da sua conta.")
        navigate("/");
    }
    return (
        <>
            {user.role === "aluno" && user.status === "ativo" &&

                <div>
                    <h1>Olá {user.nome} seu email é {user.email}</h1>
                    <button onClick={logout}>deslogar</button>
                </div>
            }
        </>


    )
}