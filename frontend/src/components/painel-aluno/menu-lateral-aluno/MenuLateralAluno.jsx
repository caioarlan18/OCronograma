import styles from './MenuLateralAluno.module.css';
import logocronogramabranco from '../../../images/logocronogramabranco.png';
import iconehistorico from '../../../images/historico.svg';
import iconeestatistica from '../../../images/estatistica.svg';
import iconemeucronograma from '../../../images/meucronograma.svg';
import iconelogout from '../../../images/iconelogout.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import sidebaricon from '../../../images/sidebar.svg'
import { useState } from 'react';
export function MenuLateralAluno({ ativo }) {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        toast.success("Até logo! Você saiu da sua conta.")
        navigate("/");
    }
    const [abrir, setAbrir] = useState(true);

    return (
        <div className={abrir ? styles.sidebarContainer : styles.inactive}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarr}>
                    <Link to={'/'}>
                        <div className={ativo === 1 ? styles.ativo2 : styles.sidebar1}>
                            <img src={logocronogramabranco} alt="logo-cronograma-branco" />
                        </div>
                    </Link>

                    <div className={styles.sidebar2}>
                        <Link to={"/painel-aluno"} className={ativo === 2 ? styles.ativo : styles.sidebar3}>
                            <img src={iconemeucronograma} alt="" />
                            <p>Meu Cronograma</p>
                        </Link>
                        <Link to={"/painel-aluno-estatisticas"} className={ativo === 3 ? styles.ativo : styles.sidebar3}>
                            <img src={iconeestatistica} alt="" />
                            <p>Estatísticas</p>
                        </Link>
                        <Link to={"/painel-aluno-historico-cronogramas"} className={ativo === 4 ? styles.ativo : styles.sidebar3}>
                            <img src={iconehistorico} alt="" />
                            <p>Histórico de Cronogramas</p>
                        </Link>
                    </div>
                </div>
                <div className={styles.rec}>

                    <div className={styles.logout} onClick={logout}>
                        <img src={iconelogout} alt="" />
                        <h1>Deslogar</h1>
                    </div>

                    <div className={styles.sidebar4}>
                        <img src={sidebaricon} alt="" onClick={() => setAbrir(!abrir)} />
                    </div>
                </div>

            </div>
        </div>
    )
}