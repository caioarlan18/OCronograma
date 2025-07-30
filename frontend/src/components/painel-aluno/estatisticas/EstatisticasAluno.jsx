import { MenuLateralAluno } from '../menu-lateral-aluno/MenuLateralAluno';
import styles from './EstatisticasAluno.module.css';
import { PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';

export function EstatisticasAluno() {
    const [acertos, setAcertos] = useState(25)
    const [erros, setErros] = useState(75)

    const data = [
        { name: 'Acertos', value: acertos },
        { name: 'Erros', value: erros },
    ];

    const colors = ['#25A54E', '#E33012'];

    return (
        <div className={styles.estati}>
            <MenuLateralAluno ativo={3} />
            <div className={styles.estati2}>
                <div className={styles.estatitxt}>
                    <h1>Acompanhe a sua evolução <br /> com o seu Cronograma atual</h1>
                </div>

                <div className={styles.estati3}>
                    <div className={styles.estati3a}>
                        <h1>Português</h1>
                    </div>

                    <div className={styles.estati3b}>
                        <div>
                            <h1>Questões <br /> Resolvidas</h1>
                            <p>{acertos + erros}</p>
                        </div>
                        <div className={styles.estati3bb}>
                            <div>
                                <h1>Acertos</h1>
                                <p>{acertos}</p>
                            </div>
                            <div>
                                <h1>Erros</h1>
                                <p>{erros}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.estati3c}>
                        <PieChart width={200} height={200}  >
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={80}
                                startAngle={90}
                                endAngle={-270}
                                dataKey="value"
                            >
                                {data.map((_, index) => (
                                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                        <div className={styles.estati3ctxt}>
                            {acertos}%
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
