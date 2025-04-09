import styles from '../login/Login.module.css';
import logoCronograma from '../../images/logocronograma.png';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import api from "../../axiosConfig/axios";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export function EsqueciSenha() {
    const navigate = useNavigate();
    const params = useParams();
    const [email, setEmail] = useState(params.email)
    async function enviarRedefinir() {
        try {
            await api.post("/esqueci-senha", {
                email
            })
            navigate("/email-enviado");

        } catch (error) {
            toast.error(error.response.data.msg);
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