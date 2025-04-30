import styles from './CriarUsuarioPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../../images/closeicon.svg';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';

import { useState } from 'react';
Modal.setAppElement('#root');

export function CriarUsuarioPopup({ abrir, fechar }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [validade, setValidade] = useState("");
    async function criarUser(e) {
        e.preventDefault();
        try {
            const response = await api.post("/user/register", {
                nome,
                email,
                senha,
                validade
            })
            setNome("");
            setEmail("");
            setSenha("");
            setValidade("")
            toast.success(response.data.msg)
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }


    return (
        <div className={styles.criaruser}>

            <Modal
                isOpen={abrir}
                onRequestClose={fechar}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000,
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        padding: '30px',
                        borderRadius: '12px',
                        width: '500px',
                        maxWidth: '90%',
                        border: 'none',
                        background: '#fff',
                    },
                }}
            >
                <div className={styles.header}>
                    <h1>Criar Usuário</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>

                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" placeholder="" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="validade">Validade de Acesso</label>
                            <input type="date" id="validade" placeholder='' value={validade} onChange={(e) => setValidade(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="senha">Senha</label>
                            <input type="text" id="senha" placeholder="" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                    </div>
                    <button className={styles.submitButton} onClick={criarUser}>Criar Usuário</button>
                </form>
            </Modal>
        </div>
    );
}
