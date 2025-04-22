import { useParams } from "react-router-dom"
import { MenuLateral } from "../../menu-lateral/MenuLateral";
import styles from './GerenciarCronogramas.module.css';
import api from './../../../../axiosConfig/axios';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import pastaAberta from '../../../../images/iconepastaaberta.svg';
import { EditarPastaPopup } from "../editar-pasta/EditarPastaPopup";
export function GerenciarCronogramas() {
    const params = useParams();
    const [pasta, setPasta] = useState([]);
    const [busca, setBusca] = useState("");
    const [abrir, setAbrir] = useState(false);
    const [cronogramas, setCronogramas] = useState([]);
    useEffect(() => {
        async function getPasta() {
            try {
                const response = await api.get(`/pasta/read/${params.idPasta}`);
                setPasta(response.data);
            } catch (error) {
                toast.error(error.response.data.msg)

            }
        }
        getPasta();
    }, [params.idPasta, abrir]);

    useEffect(() => {
        async function renderCronogramas() {
            try {
                const response = await api.get(`/cronograma/renderizar/${params.idPasta}`)
                setCronogramas(response.data);
            } catch (error) {
                toast.error(error.response.data.msg)

            }
        }
        renderCronogramas()
    }, [params.idPasta])

    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const cronogramasFiltrados = cronogramas.filter(cronograma =>
        cronograma.nome.toLowerCase().includes(busca.toLowerCase())
    );
    console.log(cronogramas)
    return (
        <div className={styles.gcro}>
            <MenuLateral ativo={3} />
            <EditarPastaPopup abrir={abrir} fechar={() => setAbrir(false)} pastaId={pasta._id} />
            <div className={styles.gcro1}>
                <div className={styles.gcro2}>
                    <input type="text" placeholder='Pesquise o cronograma...' value={busca} onChange={(e) => setBusca(e.target.value)} />
                    <button onClick={() => setAbrir(true)}>Editar pasta</button>

                </div>
                <div className={styles.gcro3}>
                    <div className={styles.cardpastas} >
                        <img src={pastaAberta} alt="icone-de-pasta" />
                        <h1>{pasta.nome}</h1>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1>Cronogramas</h1>
                        </div>

                        <table className={styles.tabela}>
                            <thead>
                                <tr>
                                    <th>Nome do Cronograma</th>
                                    <th>Administrador</th>
                                    <th>Última atualização</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cronogramasFiltrados.map((cronograma, index) => (
                                    <tr key={index} className={index % 2 === 0 ? styles.par : styles.impar}>
                                        <td data-label="Nome do cronograma">{cronograma.nome}</td>
                                        <td data-label="usuario criador">{cronograma.userCriador}</td>
                                        <td data-label="Data de atualização">{formatarData(cronograma.updatedAt)}</td>
                                        <td data-label="Ações">
                                            <button className={styles.botao}>Editar</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    )
}