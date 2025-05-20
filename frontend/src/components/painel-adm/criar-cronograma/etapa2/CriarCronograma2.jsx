import { useEffect, useState } from 'react';
import { MenuLateral } from '../../menu-lateral/MenuLateral';
import styles from './CriarCronograma2.module.css';
import { useParams } from 'react-router-dom';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import interrogacao from '../../../../images/interrogacao.svg';
import olhoAberto from '../../../../images/olhoaberto.svg';
import olhoFechado from '../../../../images/olhofechado.svg';
import copyicon from '../../../../images/copy.svg';
export function CriarCronograma2() {
    const params = useParams();
    const navigate = useNavigate();
    const [selectedWeek, setSelectedWeek] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [cronograma, setCronograma] = useState(null);
    const [area, setArea] = useState("");
    const [resumo, setResumo] = useState("");
    const [links, setLinks] = useState("");
    const [materias, setMaterias] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const [novoNome, setNovoNome] = useState("");
    const selectedWeekData = cronograma?.semanas?.[selectedWeek];
    const selectedDayData = selectedWeekData?.dias?.[selectedDay];
    const semanaId = selectedWeekData?._id;
    const diaId = selectedDayData?._id;
    useEffect(() => {
        async function getCronograma() {
            try {
                const response = await api.get(`/cronograma/read/${params.idCronograma}`);
                setCronograma(response.data);
                setNovoNome(response.data.nome);
                setMaterias(response.data?.semanas?.[selectedWeek]?.dias?.[selectedDay]?.conteudos || []);
            } catch (error) {
                toast.error(error.response?.data?.msg || 'Erro ao carregar cronograma');
            }
        }
        getCronograma();
    }, [params.idCronograma, trigger, selectedWeek, selectedDay]);

    const handleInputChange = (event, index, field) => {
        const newMaterias = [...materias];
        newMaterias[index] = {
            ...newMaterias[index],
            [field]: event.target.value,
        };
        setMaterias(newMaterias);
    };

    const handleSaveMateria = async (index) => {
        const materia = materias?.[index];

        if (!materia || !materia._id) {
            toast.error("Matéria inválida ou não encontrada.");
            return;
        }

        try {
            const updatedContent = {
                areaConhecimento: materia.areaConhecimento,
                resumoConteudo: materia.resumoConteudo,
                link: materia.link,
            };

            await api.put(
                `/cronograma/${params.idCronograma}/semana/${semanaId}/dia/${diaId}/conteudo/${materia._id}`,
                updatedContent
            );

            setTrigger(prev => !prev);
        } catch (error) {
            toast.error(error.response?.data?.msg || "Erro ao salvar matéria.");
            console.error(error);
        }
    };


    async function excluirSemana(id) {
        try {
            const response = await api.delete(`/cronograma/${params.idCronograma}/semana/${id}`);
            setTrigger(prev => !prev);
            setSelectedWeek(prev => (prev === 0 ? 0 : prev - 1));
            toast.success(response.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }
    }

    async function excluirDia(id) {
        try {
            const response = await api.delete(`/cronograma/${params.idCronograma}/semana/${semanaId}/dia/${id}`);
            setTrigger(prev => !prev);
            setSelectedDay(prev => (prev === 0 ? 0 : prev - 1));
            toast.success(response.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }
    }

    async function criarSemana() {
        try {
            const response = await api.post(`/cronograma/${params.idCronograma}/semana/`);
            setTrigger(prev => !prev);
            toast.success(response.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }
    }

    async function criarDia() {
        try {
            const response = await api.post(`/cronograma/${params.idCronograma}/semana/${semanaId}/dia`);
            setTrigger(prev => !prev);
            toast.success(response.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }
    }

    async function criarMateria() {
        try {
            const response = await api.post(`/cronograma/${params.idCronograma}/semana/${semanaId}/dia/${diaId}`, {
                areaConhecimento: area,
                resumoConteudo: resumo,
                link: links
            });
            setTrigger(prev => !prev);
            toast.success(response.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }
    }

    async function removerConteudo(id) {
        try {
            const response = await api.delete(`/cronograma/${params.idCronograma}/semana/${semanaId}/dia/${diaId}/conteudo/${id}`);
            setTrigger(prev => !prev);
            toast.success(response.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg);
        }
    }

    async function mudarNome(e) {
        const novoTexto = e.currentTarget.textContent.trim();

        if (!novoTexto) {
            toast.error('O nome não pode ficar vazio');
            e.currentTarget.textContent = novoNome;
            return;
        }

        try {
            const response = await api.put(`/cronograma/atualizar-nome/${params.idCronograma}`, {
                novoNome: novoTexto,
            });
            toast.success(response.data.msg);
            setNovoNome(novoTexto);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Erro ao atualizar o nome');
        }
    }

    async function changeVisible(semanaId) {
        try {
            const response = await api.put(`/cronograma/${params.idCronograma}/semana/${semanaId}/changevisible`);
            setTrigger(prev => !prev);
            toast.success(response.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Erro ao atualizar o nome');

        }
    }
    async function clonarSemana(semanaId) {
        try {
            const response = await api.post(`/cronograma/${params.idCronograma}/semana/${semanaId}/clonar`);
            setTrigger(prev => !prev);
            toast.success(response.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg || 'Erro ao clonar semana');

        }
    }
    return (
        <div className={styles.cronograma2a}>
            <MenuLateral ativo={2} />
            <div className={styles.cronograma2b}>
                <div className={styles.cronogramaContainer} >
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title} contentEditable suppressContentEditableWarning
                            onBlur={mudarNome} onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    e.currentTarget.blur();
                                }
                            }}>{novoNome} </h1>
                        <p className={styles.subtitle}>
                            Escolha a semana do Cronograma <br />e o dia que deseja editar.
                        </p>
                    </div>

                    {/* Seletor de Semanas */}
                    <div className={styles.weekSelector}>
                        {cronograma?.semanas?.map((semana, index) => (
                            <div key={index + 2}>

                                <div className={styles.visible} key={index + 3}>
                                    <span>Visiblidade:</span>
                                    <img
                                        src={semana.visible ? olhoAberto : olhoFechado}
                                        alt="visibilidade"
                                        onClick={() => changeVisible(semana._id)}
                                    />
                                    <img
                                        src={copyicon}
                                        alt="duplicar"
                                        onClick={() => clonarSemana(semana._id)}
                                        className={styles.dupli}
                                    />
                                </div>

                                <button
                                    key={index + 4}
                                    className={`${styles.weekButton} ${selectedWeek === index ? styles.active : ''}`}
                                    onClick={() => {
                                        setSelectedWeek(index);
                                        setSelectedDay(0);
                                    }}

                                >
                                    Semana {index + 1}
                                    {index !== 0 && (
                                        <span className={styles.plusIcon} onClick={() => excluirSemana(semana._id)}>x</span>
                                    )}
                                </button>
                            </div>

                        ))}
                        <button className={styles.addWeekButton} onClick={criarSemana}>
                            <span className={styles.plusIcon}>+</span>
                        </button>
                    </div>

                    {/* Conteúdo Principal */}
                    <div className={styles.contentWrapper}>
                        {/* Seletor de Dias */}
                        {cronograma?.semanas?.[selectedWeek]?.dias && (
                            <div className={styles.daySelector}>
                                {cronograma.semanas[selectedWeek].dias.map((dia, dayIndex) => (
                                    <button
                                        key={dayIndex}
                                        className={`${styles.dayButton} ${selectedDay === dayIndex ? styles.active : ''}`}
                                        onClick={() => setSelectedDay(dayIndex)}
                                    >
                                        Dia {dayIndex + 1}
                                        {dayIndex !== 0 && (
                                            <span className={styles.plusIcon} onClick={() => excluirDia(dia._id)}>x</span>
                                        )}
                                    </button>
                                ))}
                                <button className={styles.addDayButton} onClick={criarDia}>
                                    <span className={styles.plusIcon}>+</span>
                                </button>
                            </div>
                        )}

                        {/* Conteúdo da Matéria */}
                        <div className={styles.subjectGroup}>
                            {materias.map((conteudo, i) => (
                                <div className={styles.subjectContent} key={i}>
                                    <span className={styles.removerConteudo} onClick={() => removerConteudo(conteudo._id)}>x</span>
                                    <h2 className={styles.subjectTitle}>Matéria {i + 1}</h2>

                                    <div className={styles.subjectFields}>
                                        <div className={styles.field}>
                                            <label className={styles.fieldTitle}>Área do Conhecimento</label>
                                            <input
                                                type="text"
                                                value={conteudo.areaConhecimento || ""}
                                                onChange={(e) => handleInputChange(e, i, 'areaConhecimento')}
                                                onBlur={() => handleSaveMateria(i)}
                                            />
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.fieldTitle}>Resumo do Conteúdo</label>
                                            <textarea
                                                value={conteudo.resumoConteudo || ""}
                                                onChange={(e) => handleInputChange(e, i, 'resumoConteudo')}
                                                onBlur={() => handleSaveMateria(i)}

                                            />
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.fieldTitle}>Links <img src={interrogacao} data-tooltip-id="info-tooltip" alt="" />
                                                <Tooltip
                                                    id="info-tooltip"
                                                    place="top"
                                                    style={{ backgroundColor: '#333', color: '#fff', fontSize: '13px', maxWidth: '250px', padding: '8px' }}
                                                >
                                                    Formato: <strong>TÍTULO DO BOTÃO</strong>, <strong>URL</strong><br />
                                                    (A URL deve começar com http ou https)<br />
                                                    Separe com vírgulas: TÍTULO, URL, TÍTULO, URL<br />
                                                    Se não tiver título, será usado "Acessar".
                                                </Tooltip>

                                            </label>
                                            <textarea
                                                value={conteudo.link || ""}
                                                onChange={(e) => handleInputChange(e, i, 'link')}
                                                onBlur={() => handleSaveMateria(i)}

                                            />
                                        </div>

                                        {/* <button className={styles.saveButton} onClick={() => handleSaveMateria(i)}>
                                            Salvar
                                        </button> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botões Atribuir e Criar Matéria */}
                    <div className={styles.materia}>
                        <button className={styles.materiaButton} onClick={criarMateria}>
                            Criar Matéria
                            <span className={styles.arrowIcon}>+</span>
                        </button>
                        <button className={styles.atribuirButton} onClick={() => navigate(`/criar-cronograma3/${params.idCronograma}`)}>
                            Atribuir Usuário
                            <span className={styles.arrowIcon}>&gt;</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
