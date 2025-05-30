import styles from './EditarUsuario.module.css';
import Modal from 'react-modal';
import closeicon from '../../../../images/closeicon.svg';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

Modal.setAppElement('#root');

export function EditarUsuarioPopup({ abrir, fechar, idUser }) {
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [validade, setValidade] = useState("");
    const [status, setStatus] = useState("");
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState([]);
    const [cargo, setCargo] = useState("");
    const [createdAt, setCreatedAt] = useState("");





    //usuario adm
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

    //usuario a ser editado
    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get(`/user/read/${idUser}`)
                setNome(response.data.nome)
                setEmail(response.data.email)
                setValidade(response.data.validade?.split('T')[0]);
                setStatus(response.data.status);
                setCargo(response.data.role);
                setCreatedAt(response.data.createdAt)
            } catch (error) {
                toast.error(error.response.data.msg);
            }
        }
        getUser();
    }, [idUser]);

    async function saveUser(e) {
        e.preventDefault();
        if (idUser === id && cargo === "distribuidor") {
            toast.error("Você (distribuidor) não pode editar você mesmo")
        } else if (user.role != "administrador" && cargo === "administrador") {
            toast.error("Não é possível editar um administrador master")
        }
        else {
            try {
                const response = await api.put(`/user/editar/${idUser}`, {
                    novoNome: nome,
                    novoEmail: email,
                    novaValidade: validade,
                    novoCargo: cargo
                });
                toast.success(response.data.msg);
                fechar();
            } catch (error) {
                toast.error(error.response.data.msg);

            }
        }

    }
    async function deleteUser(e) {
        e.preventDefault();
        if (user.role != "administrador") {
            toast.error("Somente o admnistrador pode deletar um usuário");
        }
        else if (idUser === id) {
            toast.error("Não é possível deleter você mesmo")
        } else if (cargo === "administrador") {
            toast.error("Não é possível deleter um administrador master");
        } else {
            const resultado = await Swal.fire({
                title: 'Tem certeza?',
                text: 'Essa ação vai excluir o usuário permanentemente.',
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
                    const response = await api.delete(`/user/delete/${idUser}`);
                    toast.success(response.data.msg);
                    fechar();
                } catch (error) {
                    toast.error(error.response.data.msg);

                }
            }
        }

    }


    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    return (
        <div className={styles.editaruser}>

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
                    <h1>Edite o usuário</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>

                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="nome">Nome</label>
                            <input type="text" id="nome" placeholder="Victor Soares" value={nome} onChange={(e) => setNome(e.target.value)} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="validade">Validade de Acesso</label>
                            <input type="date" id="validade" placeholder='19/09/2025' value={validade} onChange={(e) => setValidade(e.target.value)} />
                        </div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="victorsoares@gmail.com" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="senha">Cargo</label>
                            {user.role === "administrador" && cargo !== "administrador" ?
                                (<div>
                                    <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
                                        <option value="aluno">Aluno</option>
                                        <option value="distribuidor">Distribuidor</option>
                                        <option value="baterista">Baterista</option>
                                    </select>
                                </div>)

                                : (<input type="text" value={cargo} readOnly />)}

                        </div>


                    </div>
                    <div className={styles.row}>
                        <div className={styles.inputGroup}>
                            <label htmlFor="senha">Data de criação</label>
                            <input type="text" value={formatarData(createdAt)} readOnly />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="senha">Status</label>
                            <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} readOnly />
                        </div>
                    </div>

                    <button className={styles.submitButton} onClick={saveUser} >Salvar alterações do Usuário</button>
                    <button className={styles.excluirButton} onClick={deleteUser} >Excluir</button>
                    {/* {
                        cargo === "aluno"
                            ? <button className={styles.promoverButton} onClick={promoverAdm}>Promover Administrador</button>
                            : cargo === "distribuidor"
                                ? <button className={styles.promoverButton} onClick={rebaixarAdm}>Rebaixar</button>
                                : <button className={styles.promoverButton} onClick={(e) => e.preventDefault()}>Moderador Master</button>
                    } */}

                </form>
            </Modal>
        </div>
    );
}
