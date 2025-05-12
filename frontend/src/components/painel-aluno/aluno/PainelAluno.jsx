import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import api from "../../../axiosConfig/axios";
import { useNavigate } from "react-router-dom";
import styles from './PainelAluno.module.css';
import logoCronograma from '../../../images/logocronogramaroxa.png';
import iconelogout from '../../../images/logoutaluno.svg';
import trespontos from '../../../images/3pontos.svg';
import logomain from '../../../images/logocronograma.png';
export function PainelAluno() {
    const navigate = useNavigate();
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState([]);
    const [cronogramaId, setCronogramaId] = useState("");
    const [cronograma, setCronograma] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(0);
    useEffect(() => {
        async function getUserData() {
            try {
                const response = await api.get(`/user/read/${id}`);
                setUser(response.data);
                setCronogramaId(response.data.cronogramaAssociado);
            } catch (error) {
                toast.error(error);
            }
        }
        getUserData();
    }, [id]);

    useEffect(() => {
        async function getCronograma() {
            if (!cronogramaId) return;
            try {
                const response = await api.get(`/cronograma/read/${cronogramaId}`);
                setCronograma(response.data);
            } catch (error) {
                toast.error(error);
            }
        }
        getCronograma()
    }, [cronogramaId])

    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        toast.success("Até logo! Você saiu da sua conta.")
        navigate("/");
    }
    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    return (
        <div className={styles.aluno}>

            {user.role === "aluno" && user.status === "ativo" ?
                (
                    <div className={styles.aluno1}>
                        <div className={styles.aluno2}>
                            <div className={styles.aluno2a}>
                                <img src={logoCronograma} alt="logo-cronograma" />
                                <p>{cronograma.nome}</p>
                            </div>
                            <div className={styles.aluno2b}>
                                {cronograma?.semanas?.map((semana, index) => (
                                    <button onClick={() => setSelectedWeek(index)} key={index} className={selectedWeek === index ? styles.bttativosemana : styles.bttsemana}>Semana {index + 1}</button>
                                ))}
                            </div>
                            <div className={styles.aluno2c}>
                                <span>Validade de Acesso</span>
                                <p>{formatarData(user.validade)}</p>
                            </div>
                            <div className={styles.aluno2d}>
                                {/* <button> <img src={trespontos} alt="" /> Opções</button> */}
                                <button onClick={logout}>  <img src={iconelogout} alt="" /> Deslogar</button>
                            </div>
                        </div>
                        <div className={styles.aluno3}>

                            {cronograma?.semanas?.[selectedWeek].dias?.map((dia, index) => (
                                <div className={styles.aluno3a} key={index}>
                                    <div className={styles.aluno3b}>
                                        <h1>Dia {index + 1}</h1>
                                    </div>
                                    {dia.conteudos.map((conteudo, index) => {
                                        const links = conteudo.link?.split(",").map(link => link.trim()).filter(Boolean) || [];

                                        const nomeBotao = links[0];
                                        const linksClicaveis = links.slice(1);

                                        return (
                                            <div className={styles.aluno3c} key={index}>
                                                <h1>{conteudo.areaConhecimento}</h1>
                                                <p>{conteudo.resumoConteudo}</p>

                                                {linksClicaveis.map((link, i) => (
                                                    <button key={i} onClick={() => window.open(link, "_blank")}>
                                                        {nomeBotao}
                                                    </button>
                                                ))}
                                            </div>
                                        );
                                    })}
                                    {/* {dia.conteudos.map((conteudo, index) => (
                                        <div className={styles.aluno3c} key={index}>
                                            <h1>{conteudo.areaConhecimento}</h1>
                                            <p>{conteudo.resumoConteudo}</p>
                                            <button>Cadernos de Questões</button>
                                        </div>
                                    ))} */}

                                </div>
                            ))}
                            {!cronogramaId && <div className={styles.ncro}>
                                <div className={styles.ncro2}>
                                    <div className={styles.maintxt}>
                                        <h1>Nenhum cronograma</h1>
                                        <p>Você não tem nenhum cronograma associado na sua conta, entra em contato com o suporte no botão abaixo</p>
                                    </div>
                                    <div className={styles.ctt}>
                                        <button >Falar com suporte</button>
                                    </div>
                                </div>


                            </div>}
                        </div>
                    </div>

                ) : (

                    <div className={styles.inativo0}>

                        <div className={styles.intativo}>
                            <div className={styles.inativo1}>
                                <img src={logomain} alt="logo-cronograma" />
                            </div>
                            <div className={styles.inativo2}>
                                <div className={styles.maintxt}>
                                    <h1>Sua conta está vencida</h1>
                                    <p>Renove para continuar tendo acesso, entre em contato com nosso time clicando no botão abaixo</p>
                                </div>
                                <div className={styles.ctt}>
                                    <button >Falar com suporte</button>
                                </div>
                            </div>


                        </div>
                    </div>


                )
            }
        </div>


    )
}