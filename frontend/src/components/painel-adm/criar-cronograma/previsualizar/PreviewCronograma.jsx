import styles from './PreviewCronograma.module.css';
import Modal from 'react-modal';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { ResumoPopup } from '../../../painel-aluno/RegistroPopup/ResumoPopup';
import logoCronograma from '../../../../images/logocronogramaroxa.png';
Modal.setAppElement('#root');
export function PreviewCronograma({ abrir, fechar, cronogramaId, gatilho }) {
    const [cronograma, setCronograma] = useState([]);
    const [selectedWeek, setSelectedWeek] = useState(0);
    const [abrirResumo, setAbrirResumo] = useState(false);
    const [resumoTexto, setResumoTexto] = useState("");
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
    }, [cronogramaId, gatilho]);

    function buscarResumo(conteudo) {
        if (conteudo.resumo) {
            setResumoTexto(conteudo.resumo);
            setAbrirResumo(true);
        } else {
            toast.error("Resumo não disponível");
        }
    }

    return (
        <div className={styles.preview}>

            <Modal
                isOpen={abrir}
                onRequestClose={fechar}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000,
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        padding: '0px',
                        width: '100%',
                        height: '100%',
                        border: 'none',
                        background: '#fff',
                    },
                }}
            >
                <div className={styles.aluno}>

                    <div className={styles.aluno1}>
                        <div className={styles.aluno2}>
                            <div className={styles.aluno2a}>
                                <img src={logoCronograma} alt="logo-cronograma" />
                                <p>{cronograma.nome}</p>
                            </div>
                            <div className={styles.aluno2b}>
                                {cronograma?.semanas?.map((semana, index) => (
                                    <div key={index}>
                                        <button onClick={() => setSelectedWeek(index)} key={index} className={selectedWeek === index ? styles.bttativosemana : styles.bttsemana}>Semana {index + 1}</button>
                                    </div>

                                ))}
                            </div>
                            <div className={styles.aluno2c}>
                                <span>Validade de Acesso</span>
                                <p>DD/MM/YYYY</p>
                            </div>
                            <div className={styles.aluno2d}>
                                <button onClick={fechar}>Voltar</button>

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
                                                {conteudo.resumo && (
                                                    <button onClick={() => buscarResumo(conteudo)} className={styles.btnResumo}>
                                                        Ver Resumo
                                                    </button>
                                                )}
                                                {conteudo.mapa && (
                                                    <button onClick={() => window.open(`https://supabase.blinblin.digital/storage/v1/object/public/${conteudo.mapa}`, "_blank")} className={styles.btnMapa}>
                                                        Mapa Mental
                                                    </button>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <ResumoPopup abrir={abrirResumo} fechar={() => setAbrirResumo(false)} resumo={resumoTexto} />
            </Modal>
        </div>
    );
}
