import styles from './EditarPastaPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../../images/closeicon.svg';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
Modal.setAppElement('#root');

export function EditarPastaPopup({ abrir, fechar, pastaId }) {
    const navigate = useNavigate();
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
    useEffect(() => {
        async function getPasta() {
            try {
                if (!pastaId) return;
                const response = await api.get(`/pasta/read/${pastaId}`)
                setNome(response.data.nome)
            } catch (error) {
                toast.error(error.response.data.msg);
            }
        }
        getPasta();
    }, [pastaId]);
    async function EditarPasta(e) {
        e.preventDefault();
        if (user.role != "administrador" && user.role != "distribuidor") return toast.error("Baterista não pode editar pastas");
        try {
            const response = await api.put(`/pasta/editar/${pastaId}`, {
                novoNome: nome,

            })
            toast.success(response.data.msg)
            fechar();
        } catch (error) {
            toast.error(error.response.data.msg)
        }
    }
    async function deletePasta(e) {
        e.preventDefault();

        if (user.role !== "administrador") return toast.error("Somente o administrador pode deletar uma pasta");
        const resultado = await Swal.fire({
            title: 'Tem certeza?',
            text: 'Essa ação irá excluir a pasta e todos os cronogramas dentro dela para sempre.',
            icon: 'warning',
            iconColor: '#E30613',
            showCancelButton: true,
            confirmButtonColor: '#E30613',
            cancelButtonColor: '#4D02E0',
            confirmButtonText: 'Sim, excluir',
            cancelButtonText: 'Cancelar',
            didOpen: () => {
                const popup = document.querySelector('.swal2-popup');
                popup.style.fontFamily = 'Poppins, sans-serif';
            }
        });
        if (resultado.isConfirmed) {
            try {
                const response = await api.delete(`/pasta/delete/${pastaId}`);
                toast.success(response.data.msg);
                navigate("/gerenciar-cronogramas")
            } catch (error) {
                console.log("ERRO COMPLETO:", error);
                toast.error(error.response.data.msg);

            }
        }


    }

    return (
        <div className={styles.editarpasta}>

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
                    <h1>Editar Pasta</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>

                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" placeholder="Nome da pasta" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>

                    </div>

                    <button className={styles.submitButton} onClick={EditarPasta}>Salvar</button>
                    <button className={styles.excluirButton} onClick={deletePasta}>Excluir Pasta</button>

                </form>
            </Modal>
        </div>
    );
}
