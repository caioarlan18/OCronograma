import styles from '../login/Login.module.css';
import logoCronograma from '../../images/logocronograma.svg';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import api from "../../axiosConfig/axios";
import { useNavigate } from 'react-router-dom';
export function RedefinirSenha() {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const [senha, setSenha] = useState()
    async function Redefinir() {
        try {
            const response = await api.patch(`redefinir-senha/${id}`, {
                novaSenha: senha
            })
            setSenha("");
            alert(response.data.msg);
            navigate("/")
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
                    <h1>Redefinir senha</h1>
                    <p>Digite sua nova senha abaixo</p>
                </div>
                <div className={styles.campo1}>
                    <label htmlFor="">Senha</label>
                    <input type="email" placeholder='Digite sua nova senha' value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                </div>

                <div className={styles.logar}>
                    <button onClick={Redefinir}>Redefinir</button>
                </div>
            </div>

        </div>
    )

}