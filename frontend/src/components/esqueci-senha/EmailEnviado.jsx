import styles from '../login/Login.module.css';
import logoCronograma from '../../images/logocronograma.png';
import { useNavigate } from 'react-router-dom';
export function EmailEnviado() {
    const navigate = useNavigate();
    return (
        <div className={styles.login}>

            <div className={styles.login1}>
                <img src={logoCronograma} alt="logo-cronograma" />
            </div>
            <div className={styles.login2}>
                <div className={styles.maintxt}>
                    <h1>Sucesso!</h1>
                    <p>Caso seu email seja válido, você receberá um link com redefinição de senha.</p>
                </div>

                <div className={styles.bttobg}>
                    <button onClick={() => navigate("/")}>Obrigado</button>
                </div>
            </div>

        </div>
    )

}