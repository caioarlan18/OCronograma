import styles from '../login/Login.module.css';
import logoCronograma from '../../images/logocronograma.svg';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import api from "../../axiosConfig/axios";
export function EsqueciSenha() {
    const params = useParams();
    const [email, setEmail] = useState(params.email)
    async function enviarRedefinir() {
        try {
            const response = await api.post("/esqueci-senha", {
                email
            })
            alert(response.data.msg);
        } catch (error) {
            alert(error.response.data.msg);
        }

    }
    return (
        <div className={styles.login}>
            <div className={styles.login1}>
                <img src={logoCronograma} alt="logo-cronograma" />
            </div>
            <div className={styles.login2}>
                <div className={styles.maintxt}>
                    <h1>Recupere seu Acesso</h1>
                    <p>Para receber um email de redefinição de senha</p>
                </div>
                <div className={styles.campo1}>
                    <label htmlFor="">Email</label>
                    <input type="email" placeholder='Digite o seu email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className={styles.logar}>
                    <button onClick={enviarRedefinir}>Enviar</button>
                </div>
            </div>

        </div>
    )

}