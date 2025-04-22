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
                </div>

            </div>
        </div>
    )
}