import { MenuLateral } from "../../menu-lateral/MenuLateral";
import styles from './Pastas.module.css';
import { useEffect, useState } from "react";
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import pastafechada from '../../../../images/iconepastafechada.svg';
import { Link } from "react-router-dom";
import { CriarPastaPopup } from "../criar-pasta/CriarPastaPopup";
import { LoadingSpinner } from "../../../../components/common/LoadingSpinner";
import { Pagination } from "../../../../components/common/Pagination";
export function Pastas() {
    const [pastas, setPastas] = useState([]);
    const [busca, setBusca] = useState("");
    const [abrir, setAbrir] = useState(false);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(8);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        async function getPastas() {
            try {
                setLoading(true);
                const response = await api.get("/pasta/read")
                setPastas(response.data.reverse());
                setCurrentPage(1);
            } catch (error) {
                toast.error(error.response.data.msg)
            } finally {
                setLoading(false);
            }
        }
        getPastas();
    }, [abrir])
    const pastaFiltrada = pastas.filter((pasta) => pasta.nome.toLowerCase().startsWith(busca.toLowerCase()));

    // Calcular paginação
    const totalPages = Math.ceil(pastaFiltrada.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pastasRenderizadas = pastaFiltrada.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.gerenciarCronogramas}>
            <MenuLateral ativo={3} />
            <CriarPastaPopup abrir={abrir} fechar={() => setAbrir(false)} />
            <div className={styles.gerenciarCronogramas1}>
                <div className={styles.gerenciarCronogramas2}>
                    <input type="text" placeholder='Pesquise a pasta...' value={busca} onChange={(e) => setBusca(e.target.value)} />
                    <button onClick={() => setAbrir(true)}>+ Criar pasta</button>
                </div>
                <div className={styles.gerenciarCronogramas3}>
                    {loading ? (
                        <div className={styles.loadingContainer}>
                            <LoadingSpinner />
                        </div>
                    ) : pastaFiltrada.length > 0 ? (
                        <>
                            {pastasRenderizadas.map((pasta, index) => (
                                <Link to={`/gerenciar-cronogramas/${pasta._id}`} className={styles.cardpastas} key={index}>
                                    <img src={pastafechada} alt="icone-de-pasta" />
                                    <h1>{pasta.nome}</h1>
                                </Link>
                            ))}
                        </>
                    ) : (
                        <div className={styles.emptyContainer}>
                            <p>Nenhuma pasta encontrada</p>
                        </div>
                    )}
                </div>

                {pastaFiltrada.length > 0 && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                        itemsPerPage={itemsPerPage}
                        totalItems={pastaFiltrada.length}
                    />
                )}
            </div>
        </div>
    )
}