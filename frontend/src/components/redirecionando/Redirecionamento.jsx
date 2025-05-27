import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import api from "../../axiosConfig/axios";
import { useNavigate } from "react-router-dom";
import styles from './Redirecionamento.module.css';
import logoCronograma from '../../images/logocronograma.png'
export function Redirecionamento() {
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
        if (user.role === "administrador" || user.role === "distribuidor" || user.role === "baterista") {
            return navigate("/painel-adm-feed")
        } else if (user.role === "aluno") {
            return navigate("/painel-aluno")
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
    return (
        <div>
            <div className={styles.redi}>
                <div className={styles.redi1}>
                    <img src={logoCronograma} alt="logo-cronograma" />
                </div>
                <div className={styles.redi2}>
                    <div className={styles.maintxt}>
                        <h1>Redirecionando {user.nome}...</h1>
                        <p>Aguarde um momento até que você seja redirecionado</p>
                    </div>
                </div>

            </div>
        </div>
    )
}