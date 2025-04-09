import styles from './Login.module.css';
import logoCronograma from '../../images/logocronograma.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export function Login() {
    const [email, setEmail] = useState("");

    return (
        <div className={styles.login}>
            <div className={styles.login1}>
                <img src={logoCronograma} alt="logo-cronograma" />
            </div>
            <div className={styles.login2}>
                <div className={styles.maintxt}>
                    <h1>Entrar</h1>
                    <p>Bem vindo! Acesse aqui o seu Cronograma.</p>
                </div>
                <div className={styles.campo1}>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Digite o seu email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className={styles.campo2}>
                    <label htmlFor="">Senha</label>
                    <input type="password" placeholder='Digite a sua senha' />
                </div>
                <div className={styles.logpass}>
                    <div className={styles.logpass2}>
                        <input type="checkbox" />
                        <label htmlFor="">Manter Logado</label>
                    </div>
                    <div className={styles.logpass2}>
                        <Link to={`/esqueci-senha/${email}`}>Esqueci a senha</Link>
                    </div>
                </div>
                <div className={styles.logar}>
                    <button>Entrar</button>
                </div>
            </div>

        </div>
    )

}