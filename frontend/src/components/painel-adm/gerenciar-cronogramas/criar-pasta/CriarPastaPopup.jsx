import styles from './CriarPastaPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../../images/closeicon.svg';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';

import { useEffect, useState } from 'react';
Modal.setAppElement('#root');

export function CriarPastaPopup({ abrir, fechar, finish }) {
    const [nome, setNome] = useState("");
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState([]);
    useEffect(() => {
        async function getUserData() {
            try {

                const response = await api.get(`/user/read/${id}`);
                setUser(response.data);
            } catch (error) {
                toast.error(error);
            }
        }
        getUserData();
    }, [id])
    async function criarPasta(e) {
        e.preventDefault();
        if (user.role != "administrador" && user.role != "distribuidor") return toast.error("Baterista não pode criar pastas");

        try {
            const response = await api.post("/pasta/criar", {
                nome,

            })
            setNome("");
            toast.success(response.data.msg)
            if (finish) fechar();
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }


    return (
        <div className={styles.criarpasta}>

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
                    <h1>Criar Pasta</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>

                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" placeholder="Nome da pasta" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>

                    </div>

                    <button className={styles.submitButton} onClick={criarPasta}>Criar Pasta</button>
                </form>
            </Modal>
        </div>
    );
}
