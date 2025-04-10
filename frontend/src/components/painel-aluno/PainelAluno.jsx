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
                if (response.data.role != "aluno") {
                    return navigate("/painel-adm")
                }
                setUser(response.data);
            } catch (error) {
                toast.error(error);
            }
        }
        getUserData();
    }, [id])
    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div>
            <h1>Olá {user.nome} seu email é {user.email}</h1>
            <button onClick={logout}>deslogar</button>
        </div>
    )
}