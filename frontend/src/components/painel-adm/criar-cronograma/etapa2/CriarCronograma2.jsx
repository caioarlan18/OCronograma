import { useEffect, useState } from 'react';
import { MenuLateral } from '../../menu-lateral/MenuLateral';
import styles from './CriarCronograma2.module.css';
import { useParams } from 'react-router-dom';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';

export function CriarCronograma2() {
    const params = useParams();
    const [selectedWeek, setSelectedWeek] = useState(0);
    const [selectedDay, setSelectedDay] = useState(0);
    const [cronograma, setCronograma] = useState(null);
    const selectedWeekData = cronograma?.semanas?.[selectedWeek];
    const selectedDayData = selectedWeekData?.dias?.[selectedDay];
    const [trigger, setTrigger] = useState(false);

    const semanaId = selectedWeekData?._id;
    const diaId = selectedDayData?._id;
    useEffect(() => {
        async function getCronograma() {
            try {
                const response = await api.get(`/cronograma/read/${params.idCronograma}`);
                setCronograma(response.data);
            } catch (error) {
                toast.error(error.response?.data?.msg || 'Erro ao carregar cronograma');
            }
        }
        getCronograma();
    }, [params.idCronograma, trigger]);

    async function excluirSemana(id) {
        try {
            const response = await api.delete(`/cronograma/${params.idCronograma}/semana/${id}`);
            setTrigger(prev => !prev);
            if (selectedWeek === 0) {
                setSelectedWeek(0)
            } else {
                setSelectedWeek(selectedWeek - 1)
            }

            toast.success(response.data.msg);
        } catch (error) {
            toast.error(error.response?.data?.msg);

        }
    }
    async function excluirDia(id) {
        try {
            const response = await api.delete(`/cronograma/${params.idCronograma}/semana/${semanaId}/dia/${id}`)
            setTrigger(prev => !prev);
            if (selectedDay === 0) {
                setSelectedDay(0)
            } else {
                setSelectedDay(selectedDay - 1)
            }

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
    return (
        <div className={styles.cronograma2a}>
            <MenuLateral ativo={2} />
            <div className={styles.cronograma2b}>
                <div className={styles.cronogramaContainer}>
                    <div className={styles.titleContainer}>
                        <h1 className={styles.title}>{cronograma?.nome}</h1>
                        <p className={styles.subtitle}>
                            Escolha a semana do Cronograma <br />e o dia que deseja editar.
                        </p>
                    </div>

                    {/* Seletor de Semanas */}
                    <div className={styles.weekSelector}>
                        {cronograma?.semanas?.map((semana, index) => (
                            <button
                                key={index}
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
                        ))}
                        <button className={styles.addWeekButton} onClick={criarSemana}>
                            <span className={styles.plusIcon} >+</span>
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
                                    <span className={styles.plusIcon} >+</span>
                                </button>
                            </div>
                        )}

                        {/* Conteúdo da Matéria */}
                        <div className={styles.subjectGroup}>
                            {(cronograma?.semanas?.[selectedWeek]?.dias?.[selectedDay]?.conteudos || []).map((conteudo, i) => (
                                <div className={styles.subjectContent} key={i}>
                                    <h2 className={styles.subjectTitle}>Matéria {i + 1}</h2>

                                    <div className={styles.subjectFields}>
                                        <div className={styles.field}>
                                            <label className={styles.fieldTitle}>Área do Conhecimento</label>
                                            <input type="text" defaultValue={conteudo.areaConhecimento} />
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.fieldTitle}>Resumo do Conteúdo</label>
                                            <textarea defaultValue={conteudo.resumoConteudo}></textarea>
                                        </div>

                                        <div className={styles.field}>
                                            <label className={styles.fieldTitle}>Links</label>
                                            <input type="url" defaultValue={conteudo.link} />
                                        </div>

                                        <button className={styles.saveButton}>Salvar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Botão Atribuir */}
                    <button className={styles.atribuirButton}>
                        Atribuir Usuário
                        <span className={styles.arrowIcon}>&gt;</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
