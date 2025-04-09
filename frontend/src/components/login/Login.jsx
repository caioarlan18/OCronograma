import styles from './Login.module.css';
import logoCronograma from '../../images/logocronograma.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../../axiosConfig/axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
export function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [marcado, setMarcado] = useState(false);

    async function login() {
        try {
            const response = await api.post("user/login", {
                email,
                senha
            });
            const id = response.data.id;
            const token = response.data.token;
            if (!marcado) {
                sessionStorage.setItem("id", id);
                sessionStorage.setItem("token", token);

            } else {
                localStorage.setItem("id", id);
                localStorage.setItem("token", token);
            }

            navigate("/painel-aluno");
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }
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
                    <input type="password" placeholder='Digite a sua senha' value={senha} onChange={(e) => { setSenha(e.target.value) }} />
                </div>
                <div className={styles.logpass}>
                    <div className={styles.logpass2}>
                        <input type="checkbox" checked={marcado} onChange={(e) => setMarcado(e.target.checked)} />
                        <label htmlFor="">Manter Logado</label>
                    </div>
                    <div className={styles.logpass2}>
                        <Link to={`/esqueci-senha/${email}`}>Esqueci a senha</Link>
                    </div>
                </div>
                <div className={styles.logar}>
                    <button onClick={login}>Entrar</button>
                </div>
            </div>

        </div>
    )

}