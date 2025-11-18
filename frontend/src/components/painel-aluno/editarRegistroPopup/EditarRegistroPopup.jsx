import styles from './EditarRegistroPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../images/closeicon.svg';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../axiosConfig/axios';
Modal.setAppElement('#root');

export function EditarRegistroPopup({ abrir, fechar, materia, idcronograma, idMateria }) {
    const navigate = useNavigate();
    const [acertos, setAcertos] = useState("");
    const [erros, setErros] = useState("");
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");

    useEffect(() => {
        async function getQuestion() {
            try {
                const response = await api.get(`/user/question/${id}/${idcronograma}/${idMateria}`);
                setAcertos(response.data.acertos);
                setErros(response.data.erros);
            } catch (error) {
                console.log(error);
            }
        }
        getQuestion()
    }, [idMateria]);
    async function editQuestion() {
        try {
            const response = await api.put(`/user/editquestion/${id}/${idcronograma}/${idMateria}`, {
                acertos: acertos,
                erros: erros
            });
            fechar()
            toast.success(response.data.msg)

        } catch (error) {
            console.log(error);

        }
    }
    return (
        <div className={styles.registro}>
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
                        width: 'min(600px, 90vw)',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                        border: 'none',
                        background: '#fff',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <div className={styles.header}>
                    <h1> <span>Matéria:</span> {materia}</h1>
                    <p>Preencha seus resultados nas bateriais de questões</p>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>
                <div className={styles.registro1}>
                    <label>Acertos</label>
                    <input type="number" value={acertos} onChange={(e) => setAcertos(e.target.value)} />
                </div>
                <div className={styles.registro1}>
                    <label>Erros</label>
                    <input type="number" value={erros} onChange={(e) => setErros(e.target.value)} />
                </div>
                <div className={styles.registro1}>
                    <label><span>Questões resolvidas:</span> {Number(acertos) + Number(erros)}</label>
                </div>
                <div className={styles.registro1}>
                    <button onClick={editQuestion}>Salvar</button>
                </div>
            </Modal>
        </div>
    );
}
