import { MenuLateral } from "../../menu-lateral/MenuLateral";
import styles from './Pastas.module.css';
import { useEffect, useState } from "react";
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import pastafechada from '../../../../images/iconepastafechada.svg';
import { Link } from "react-router-dom";
import { CriarPastaPopup } from "../criar-pasta/CriarPastaPopup";
export function Pastas() {
    const [pastas, setPastas] = useState([]);
    const [busca, setBusca] = useState("");
    const [abrir, setAbrir] = useState(false);
    useEffect(() => {
        async function getPastas() {
            try {
                const response = await api.get("/pasta/read")
                setPastas(response.data.reverse());
            } catch (error) {
                toast.error(error.response.data.msg)
            }
        }
        getPastas();
    }, [abrir])
    const pastaFiltrada = pastas.filter((pasta) => pasta.nome.toLowerCase().startsWith(busca.toLowerCase()));

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
                    {pastaFiltrada.map((pasta, index) => (
                        <Link to={`/gerenciar-cronogramas/${pasta._id}`} className={styles.cardpastas} key={index}>
                            <img src={pastafechada} alt="icone-de-pasta" />
                            <h1>{pasta.nome}</h1>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}