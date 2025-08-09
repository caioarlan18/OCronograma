import { MenuLateralAluno } from '../menu-lateral-aluno/MenuLateralAluno';
import styles from './HistoricoCronogramas.module.css';
import api from '../../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { PieChart, Pie, Cell } from 'recharts';

const colors = ['#25A54E', '#E33012'];

export function HistoricoCronogramas() {
    const id = localStorage.getItem('id') || sessionStorage.getItem('id');
    const [historico, setHistorico] = useState([]);

    useEffect(() => {
        async function getHistorico() {
            try {
                const response = await api.get(`/user/historico/${id}`);
                const dados = Array.isArray(response.data) ? response.data : [];
                setHistorico(dados.reverse());
            } catch (error) {
                toast.error('Erro ao carregar histórico.');
                console.error(error);
            }
        }
        if (id) getHistorico();
    }, [id]);

    // Soma acertos/erros por cronograma e repassa o nome
    function totaisPorCronograma(arr) {
        return arr.map((crono) => {
            const totalAcertos = (crono.questions || []).reduce((s, q) => s + (q.acertos || 0), 0);
            const totalErros = (crono.questions || []).reduce((s, q) => s + (q.erros || 0), 0);
            return {
                idCronograma: crono.idCronograma,
                nomeCronograma: crono.nomeCronograma, // veio do backend
                totalAcertos,
                totalErros,
            };
        });
    }

    const totais = totaisPorCronograma(historico);

    return (
        <div className={styles.historico}>
            <MenuLateralAluno ativo={4} />
            <div className={styles.historico2}>
                <div className={styles.historicotxt}>
                    <h1>
                        Acompanhe o histórico de resultados <br /> dos seus antigos Cronogramas
                    </h1>
                </div>

                <div className={styles.historico3}>
                    {totais.length > 0 ? (
                        totais.map((item, idx) => {
                            const totalQuestoes = item.totalAcertos + item.totalErros;
                            const pct =
                                totalQuestoes > 0 ? Math.round((item.totalAcertos / totalQuestoes) * 100) : 0;

                            const pieData = [
                                { name: 'Acertos', value: item.totalAcertos },
                                { name: 'Erros', value: item.totalErros },
                            ];

                            return (
                                <div className={styles.historico3a} key={item.idCronograma || idx}>
                                    <h1>{item.nomeCronograma}</h1>

                                    <div className={styles.historico3b}>
                                        <div>
                                            <h1>
                                                Questões <br /> Resolvidas
                                            </h1>
                                            <p>{totalQuestoes}</p>
                                        </div>

                                        <div className={styles.historicobb}>
                                            <div>
                                                <h1>Acertos</h1>
                                                <p>{item.totalAcertos}</p>
                                            </div>
                                            <div>
                                                <h1>Erros</h1>
                                                <p>{item.totalErros}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className={styles.historico3c}>
                                        <PieChart width={200} height={200}>
                                            <Pie
                                                data={pieData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={45}
                                                outerRadius={80}
                                                startAngle={90}
                                                endAngle={-270}
                                                dataKey="value"
                                            >
                                                {[item.totalAcertos, item.totalErros].map((_, index) => (
                                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>

                                        <div className={styles.historico3ctxt}>{pct}%</div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>Sem dados históricos.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
