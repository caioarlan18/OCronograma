import { MenuLateral } from '../menu-lateral/MenuLateral';
import styles from './PainelAdmFeed.module.css';
import bolaroxa from '../../../images/bolaroxa.svg';
import api from '../../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export function PainelAdmFeed() {
    const navigate = useNavigate()
    const [user, setUser] = useState([]);
    const [cronogramas, setCronogramas] = useState([]);
    const [busca, setBusca] = useState("");

    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    useEffect(() => {
        async function getUserData() {
            try {
                const response = await api.get(`/user/read/${id}`);
                setUser(response.data);
            } catch (error) {
                toast.error(error.response.data.msg);

            }
        }
        getUserData();
    }, [id])
    useEffect(() => {
        async function getCronogramas() {
            try {
                const response = await api.get("/cronograma/read");
                setCronogramas(response.data.reverse());
            } catch (error) {
                toast.error(error.response.data.msg);

            }
        }
        getCronogramas();
    }, [id])
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
    return (
        <div className={styles.paineladm}>
            <MenuLateral ativo={1} />
            <div className={styles.paineladministrador}>
                <div className={styles.paineldistribuidor}>
                    {/* <div className={styles.paineldistribuidora}>
                        <img src={bolaroxa} alt="" />
                    </div> */}
                    <div className={styles.paineldistribuidorb}>
                        <h1>Bem vindo, {user.nome}!</h1>
                        <p>Na barra ao lado estão as funções do sistema.</p>
                        <input type="text" placeholder='Pesquise o cronograma...' value={busca} onChange={(e) => setBusca(e.target.value)} />

                    </div>
                </div>
                <div className={styles.container}>

                    <div className={styles.header}>
                        <h1>Registro de Atividades ({cronogramasFiltrados.length})</h1>
                    </div>

                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Nome do Cronograma</th>
                                <th>Criador</th>
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
                                        <button className={styles.botao} onClick={() => navigate(`/criar-cronograma2/${cronograma._id}`)}>Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}