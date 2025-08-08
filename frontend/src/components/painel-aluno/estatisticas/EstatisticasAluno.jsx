import { MenuLateralAluno } from '../menu-lateral-aluno/MenuLateralAluno';
import styles from './EstatisticasAluno.module.css';
import { PieChart, Pie, Cell } from 'recharts';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../../axiosConfig/axios';

function agrupaESoma(arr) {
    const agrupado = arr.reduce((acc, item) => {
        if (!acc[item.nome]) {
            acc[item.nome] = { ...item };
        } else {
            acc[item.nome].acertos += item.acertos;
            acc[item.nome].erros += item.erros;
        }
        return acc;
    }, {});
    return Object.values(agrupado);
}

export function EstatisticasAluno() {
    const [acertos, setAcertos] = useState(25)
    const [erros, setErros] = useState(75)
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState([]);
    const [cronogramaId, setCronogramaId] = useState("");
    const [historicoAtual, setHistoricoAtual] = useState([]);

    // PieChart data
    const data = [
        { name: 'Acertos', value: acertos },
        { name: 'Erros', value: erros },
    ];
    const colors = ['#25A54E', '#E33012'];

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
        async function getHistoricoAtual() {
            try {
                if (!id || !cronogramaId) return;
                const response = await api.get(`/user/historicoAtual/${id}/${cronogramaId}`);
                setHistoricoAtual(response.data.questions);
            } catch (error) {
                toast.error(error);
            }
        }
        getHistoricoAtual();
    }, [id, cronogramaId]);

    const resultadoAgrupado = agrupaESoma(historicoAtual);
    return (
        <div className={styles.estati}>
            <MenuLateralAluno ativo={3} />
            <div className={styles.estati2}>
                <div className={styles.estatitxt}>
                    <h1>Acompanhe a sua evolução <br /> com o seu Cronograma atual</h1>
                </div>

                <div className={styles.estati3}>
                    {resultadoAgrupado.length > 0 ? (
                        resultadoAgrupado.map((item) => (
                            <div className={styles.estati3a} key={item.nome}>
                                <h1>{item.nome}</h1>
                                <div className={styles.estati3b}>
                                    <div>
                                        <h1>Questões <br /> Resolvidas</h1>
                                        <p>{item.acertos + item.erros}</p>
                                    </div>
                                    <div className={styles.estati3bb}>
                                        <div>
                                            <h1>Acertos</h1>
                                            <p>{item.acertos}</p>
                                        </div>
                                        <div>
                                            <h1>Erros</h1>
                                            <p>{item.erros}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.estati3c}>
                                    <PieChart width={200} height={200} >
                                        <Pie
                                            data={[
                                                { name: 'Acertos', value: item.acertos },
                                                { name: 'Erros', value: item.erros }
                                            ]}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={45}
                                            outerRadius={80}
                                            startAngle={90}
                                            endAngle={-270}
                                            dataKey="value"
                                        >
                                            {[item.acertos, item.erros].map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                    <div className={styles.estati3ctxt}>
                                        {Math.round(item.acertos / (item.acertos + item.erros) * 100)}%
                                    </div>
                                </div>
                            </div>

                        ))
                    ) : (
                        <div className={styles.semdados}>
                            <h1>Sem dados disponíveis</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
