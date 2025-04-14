import { useState, useEffect } from "react";
import { MenuLateral } from "../../menu-lateral/MenuLateral";
import styles from './CriarCronograma1.module.css';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import Select from 'react-select';

export function CriarCronograma1() {
    const [nome, setNome] = useState("");
    const [semanas, setSemanas] = useState(4);
    const [pastas, setPastas] = useState([]);
    const [pastaSelecionada, setPastaSelecionada] = useState(null);

    const increment = () => setSemanas((v) => v + 1);
    const decrement = () => setSemanas((v) => v > 0 ? v - 1 : 0);

    useEffect(() => {
        async function getPastas() {
            try {
                const response = await api.get("/pasta/read");
                const pastaOptions = response.data.map(pasta => ({
                    value: pasta._id,
                    label: pasta.nome
                }));
                setPastas(pastaOptions);
            } catch (error) {
                toast.error(error.response?.data || "Erro ao carregar pastas");
            }
        }
        getPastas();
    }, []);

    return (
        <div className={styles.cronograma1}>
            <MenuLateral ativo={2} />
            <div className={styles.cronograma2}>
                <div className={styles.maintxt}>
                    <h1>Criando Cronograma</h1>
                    <p>Preencha todas as etapas até o fim.</p>
                </div>
                <div className={styles.campo1}>
                    <label htmlFor="">Nome do Cronograma</label>
                    <input
                        type="text"
                        placeholder='[NOME DO CRONOGRAMA]'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className={styles.campo2}>
                    <label htmlFor="">Quantidade de semanas</label>
                    <div className={styles.campo2b}>
                        <button type="button" onClick={decrement}>-</button>
                        <input
                            type="number"
                            value={semanas}
                            onChange={(e) => setSemanas(Number(e.target.value))}
                        />
                        <button type="button" onClick={increment}>+</button>
                    </div>
                </div>
                <div className={styles.campo3}>
                    <label htmlFor="">Selecionar Pasta</label>
                    <Select
                        options={pastas}
                        value={pastaSelecionada}
                        onChange={setPastaSelecionada}
                        placeholder="Escolher pasta"
                        className={styles.select}
                        classNamePrefix="meu-select"
                        isSearchable
                    />
                </div>

                <div className={styles.criar}>
                    <button type="button">Criar</button>
                </div>
            </div>
        </div>
    )
}