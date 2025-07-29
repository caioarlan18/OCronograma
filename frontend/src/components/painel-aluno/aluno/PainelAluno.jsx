import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import api from "../../../axiosConfig/axios";
import styles from './PainelAluno.module.css';
import logoCronograma from '../../../images/logocronogramaroxa.png';
import trespontos from '../../../images/3pontos.svg';
import { OptionsPopup } from "../opcoespopup/OptionsPopup";
import { MenuLateralAluno } from "../menu-lateral-aluno/MenuLateralAluno";
export function PainelAluno() {
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState([]);
    const [cronogramaId, setCronogramaId] = useState("");
    const [cronograma, setCronograma] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [abrirPopup, setAbrirPopup] = useState(false);
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

    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    useEffect(() => {
        if (cronograma?.semanas?.length) {
            const index = cronograma.semanas.findIndex(semana => semana.visible);
            if (index !== -1) {
                setSelectedWeek(index);
            } else {
                setSelectedWeek(null);
            }
        }
    }, [cronograma]);
    return (
        <div className={styles.aluno}>
            <MenuLateralAluno ativo={2} />
            <OptionsPopup abrir={abrirPopup} fechar={() => setAbrirPopup(false)} />
            {user.role === "aluno" && user.status === "ativo" && !user.inadimplente ?
                (
                    <div className={styles.aluno1}>
                        <div className={styles.aluno2}>
                            <div className={styles.aluno2a}>
                                <p>{cronograma.nome}</p>
                            </div>
                            <div className={styles.aluno2b}>
                                {cronograma?.semanas?.map((semana, index) => (
                                    <div key={index}>
                                        {semana.visible && <button onClick={() => setSelectedWeek(index)} key={index} className={selectedWeek === index ? styles.bttativosemana : styles.bttsemana}>Semana {index + 1}</button>}
                                    </div>

                                ))}
                            </div>
                            <div className={styles.aluno2c}>
                                <span>Validade de Acesso</span>
                                <p>{formatarData(user.validade)}</p>
                            </div>
                            <div className={styles.aluno2d}>
                                <button onClick={() => setAbrirPopup(true)}> <img src={trespontos} alt="" /> Opções</button>

                            </div>
                        </div>
                        <div className={styles.aluno3}>

                            {cronograma?.semanas?.[selectedWeek]?.dias?.map((dia, index) => (
                                <div className={styles.aluno3a} key={index}>
                                    <div className={styles.aluno3b}>
                                        <h1>Dia {index + 1}</h1>
                                    </div>
                                    {dia.conteudos.map((conteudo, index) => {
                                        const partes = conteudo.link?.split(",").map(p => p.trim()).filter(Boolean) || [];

                                        const textos = partes.filter(p => !p.startsWith("http"));
                                        const links = partes.filter(p => p.startsWith("http"));

                                        return (
                                            <div className={styles.aluno3c} key={index}>
                                                <h1>{conteudo.areaConhecimento}</h1>
                                                <p>{conteudo.resumoConteudo}</p>

                                                {links.map((link, i) => (
                                                    <button key={i} onClick={() => window.open(link, "_blank")}>
                                                        {textos[i] || "Acessar"}
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
                                        <p>Você não tem nenhum cronograma associado na sua conta, entre em contato com o suporte no botão abaixo</p>
                                    </div>
                                    <div className={styles.ctt}>
                                        <button onClick={() => window.open("https://api.whatsapp.com/send/?phone=5521981780957&text=Venho+do+sistema+OCronograma+e+preciso+de+ajuda.&type=phone_number&app_absent=0", "_blank")}>Falar com suporte</button>
                                    </div>
                                </div>


                            </div>}
                        </div>
                    </div>

                ) : (
                    <div>

                        <div className={styles.aluno2}>
                            <div className={styles.aluno2a}>
                                <img src={logoCronograma} alt="logo-cronograma" />
                                <p>{cronograma.nome}</p>
                            </div>
                            <div className={styles.aluno2b}>
                                {cronograma?.semanas?.map((semana, index) => (
                                    <div key={index}>
                                        {semana.visible && <button onClick={() => setSelectedWeek(index)} key={index} className={selectedWeek === index ? styles.bttativosemana : styles.bttsemana}>Semana {index + 1}</button>}
                                    </div>

                                ))}
                            </div>
                            <div className={styles.aluno2c}>
                                <span>Validade de Acesso</span>
                                <p>{formatarData(user.validade)}</p>
                            </div>
                            <div className={styles.aluno2d}>
                                <button onClick={() => setAbrirPopup(true)}> <img src={trespontos} alt="" /> Opções</button>

                            </div>
                        </div>
                        <div className={styles.inativo0}>
                            <div className={styles.intativo}>
                                <div className={styles.inativo2}>
                                    <div className={styles.maintxt}>
                                        <h1>Sua conta está vencida ou você está em inadimplência</h1>
                                        <p>Renove agora o seu plano e volte a estudar com o seu cronograma</p>
                                    </div>
                                    <div className={styles.ctt}>
                                        <button onClick={() => window.open("https://api.whatsapp.com/send/?phone=5521981780957&text=Venho+do+sistema+OCronograma+e+preciso+de+ajuda.&type=phone_number&app_absent=0", "_blank")}>Falar com suporte</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>





                )
            }
        </div>


    )
}