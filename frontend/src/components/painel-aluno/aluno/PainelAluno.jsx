import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import api from "../../../axiosConfig/axios";
import styles from './PainelAluno.module.css';
import logoCronograma from '../../../images/logocronogramaroxa.png';
import trespontos from '../../../images/3pontos.svg';
import { OptionsPopup } from "../opcoespopup/OptionsPopup";
import { MenuLateralAluno } from "../menu-lateral-aluno/MenuLateralAluno";
import { RegistroPopup } from "../RegistroPopup/RegistroPopup";
import { AvisoPopup } from "../avisopopup/AvisoPopup";
import { EditarRegistroPopup } from "../editarRegistroPopup/EditarRegistroPopup";
export function PainelAluno() {
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState([]);
    const [cronogramaId, setCronogramaId] = useState("");
    const [cronograma, setCronograma] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(null);
    const [abrirPopup, setAbrirPopup] = useState(false);
    const [abrirRegistro, setAbrirRegistro] = useState(false);
    const [abrirRegistro2, setAbrirRegistro2] = useState(false);
    const [areaRegistro, setAreaRegistro] = useState("");
    const [idMateria, setIdMateria] = useState("");
    const [idMateria2, setIdMateria2] = useState("");
    const [checkboxMarcados, setCheckboxMarcados] = useState({});
    const ID_AVISO_ATUAL = "aviso1";
    const [showAviso, setShowAviso] = useState(false);

    useEffect(() => {
        const jaViu = localStorage.getItem(ID_AVISO_ATUAL);
        if (!jaViu) {
            setShowAviso(true);
        }
    }, []);

    function fecharAviso() {
        localStorage.setItem(ID_AVISO_ATUAL, "true");
        setShowAviso(false);
    }
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

    useEffect(() => {
        async function verificarTodasMaterias() {
            if (!cronograma?.semanas?.[selectedWeek]) return;
            let novosMarcados = {};
            const dias = cronograma.semanas[selectedWeek].dias;
            for (const dia of dias) {
                for (const conteudo of dia.conteudos) {
                    try {
                        const response = await api.get(`/user/verificarMateriaAdicionada/${id}/${conteudo._id}/${cronogramaId}`);
                        if (response.status === 200) {
                            novosMarcados[conteudo._id] = true;
                        }
                    } catch {
                        novosMarcados[conteudo._id] = false;
                    }
                }
            }
            setCheckboxMarcados(novosMarcados);
        }
        verificarTodasMaterias();
    }, [cronograma, selectedWeek, abrirRegistro]);




    return (
        <div className={styles.aluno}>
            <MenuLateralAluno ativo={2} />
            <OptionsPopup abrir={abrirPopup} fechar={() => setAbrirPopup(false)} />
            <RegistroPopup abrir={abrirRegistro} fechar={() => setAbrirRegistro(false)} materia={areaRegistro} idcronograma={cronogramaId} idMateria={idMateria} />
            <AvisoPopup abrir={showAviso} fechar={fecharAviso} />
            <EditarRegistroPopup abrir={abrirRegistro2} fechar={() => setAbrirRegistro2(false)} materia={areaRegistro} idcronograma={cronogramaId} idMateria={idMateria2} />

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
                                            <div className={styles.aluno3c} key={conteudo._id}>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        className={styles.customCheckbox}
                                                        onClick={() => (setAbrirRegistro(true), setAreaRegistro(conteudo.areaConhecimento), setIdMateria(conteudo._id))}
                                                        checked={!!checkboxMarcados[conteudo._id]}
                                                        disabled={!!checkboxMarcados[conteudo._id]}
                                                    />
                                                    {!!checkboxMarcados[conteudo._id] &&
                                                        <span className={styles.editquestion} onClick={() => (setAbrirRegistro2(true), setAreaRegistro(conteudo.areaConhecimento), setIdMateria2(conteudo._id))}>editar</span>

                                                    }
                                                </div>

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
                                        <h1>Carregando ou sem cronograma.</h1>
                                        <p>Carregando informações... Se nenhum cronograma for exibido, pode ser que nenhum esteja vinculado à sua conta neste momento.</p>
                                    </div>
                                    <div className={styles.ctt}>
                                        <button onClick={() => window.open("https://api.whatsapp.com/send/?phone=5521981780957&text=Venho+do+sistema+OCronograma+e+preciso+de+ajuda.&type=phone_number&app_absent=0", "_blank")}>Falar com suporte</button>
                                    </div>
                                </div>


                            </div>}
                        </div>
                    </div>

                ) : (
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