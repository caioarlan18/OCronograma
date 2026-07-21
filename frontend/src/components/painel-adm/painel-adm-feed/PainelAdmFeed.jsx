import { MenuLateral } from '../menu-lateral/MenuLateral';
import styles from './PainelAdmFeed.module.css';
import bolaroxa from '../../../images/bolaroxa.svg';
import api from '../../../axiosConfig/axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import { LoadingSpinner } from '../../../components/common/LoadingSpinner';
import { Pagination } from '../../../components/common/Pagination';
export function PainelAdmFeed() {
    const navigate = useNavigate()
    const [user, setUser] = useState([]);
    const [cronogramas, setCronogramas] = useState([]);
    const [busca, setBusca] = useState("");
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

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
                setLoading(true);
                const response = await api.get("/cronograma/read");
                setCronogramas(response.data.reverse());
                setCurrentPage(1);
            } catch (error) {
                toast.error(error.response.data.msg);
            } finally {
                setLoading(false);
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

    // Calcular paginação
    const totalPages = Math.ceil(cronogramasFiltrados.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const CronogramasRenderizados = cronogramasFiltrados.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
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

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
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
                                    {CronogramasRenderizados.map((cronograma, index) => (
                                        <tr key={index} className={index % 2 === 0 ? styles.par : styles.impar}>
                                            <td
                                                data-label="Nome do cronograma"
                                                data-tooltip-id={`tooltip-${index}`}
                                                data-tooltip-content={cronograma.nome}
                                                style={cronograma.usuariosAssociados.length === 0 ? { color: "red", cursor: "default" } : { cursor: "default" }}
                                            >
                                                {cronograma.nome}
                                                <Tooltip
                                                    id={`tooltip-${index}`}
                                                    place="top"
                                                    style={{
                                                        backgroundColor: '#333',
                                                        color: '#fff',
                                                        fontSize: '13px',
                                                        maxWidth: '100%',
                                                        padding: '8px',
                                                        borderRadius: '6px',
                                                    }}
                                                />
                                            </td>

                                            <td data-label="usuario criador">{cronograma.userCriador}</td>
                                            <td data-label="Data de atualização">{formatarData(cronograma.updatedAt)}</td>
                                            <td data-label="Ações">
                                                <button className={styles.botao} onClick={() => navigate(`/criar-cronograma2/${cronograma._id}`)}>Editar</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            {cronogramasFiltrados.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={cronogramasFiltrados.length}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>

    )
}