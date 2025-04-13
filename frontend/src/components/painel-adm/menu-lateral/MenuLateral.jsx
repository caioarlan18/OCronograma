import styles from './MenuLateral.module.css';
import logocronogramabranco from '../../../images/logocronogramabranco.png';
import iconemais from '../../../images/iconemais.svg';
import iconecamadas from '../../../images/iconecamadas.svg';
import iconeuser from '../../../images/iconeuser.svg';
import iconelogout from '../../../images/iconelogout.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function MenuLateral({ ativo }) {
    const navigate = useNavigate();
    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        toast.success("Até logo! Você saiu da sua conta.")
        navigate("/");
    }
    return (
        <div className={styles.sidebarContainer}>
            <div className={styles.sidebar}>
                <div className={styles.sidebarr}>
                    <Link to={'/painel-adm-feed'}>
                        <div className={ativo === 1 ? styles.ativo2 : styles.sidebar1}>
                            <img src={logocronogramabranco} alt="logo-cronograma-branco" />
                        </div>
                    </Link>

                    <div className={styles.sidebar2}>
                        <Link to={"/criar-cronograma1"} className={ativo === 2 ? styles.ativo : styles.sidebar3}>
                            <img src={iconemais} alt="" />
                            <p>Criar Cronograma</p>
                        </Link>
                        <Link className={ativo === 3 ? styles.ativo : styles.sidebar3}>
                            <img src={iconecamadas} alt="" />
                            <p>Gerenciar Cronogramas</p>
                        </Link>
                        <Link to={"/gerenciar-usuarios"} className={ativo === 4 ? styles.ativo : styles.sidebar3}>
                            <img src={iconeuser} alt="" />
                            <p>Gerenciar Usuários</p>
                        </Link>
                    </div>
                </div>

                <div className={styles.logout} onClick={logout}>
                    <img src={iconelogout} alt="" />
                    <h1>Deslogar</h1>
                </div>
            </div>
        </div>
    )
}