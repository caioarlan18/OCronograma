import styles from './OptionsPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../images/closeicon.svg';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconelogout from '../../../images/logoutaluno.svg';
import faqicon from '../../../images/faq.svg';
import suporteicon from '../../../images/suporteicon.svg';
import { FaleConoscoPopup } from '../faleconosco-popup/FaleConoscoPopUp';

Modal.setAppElement('#root');

export function OptionsPopup({ abrir, fechar }) {
    const navigate = useNavigate();
    const [abrirFale, setAbrirFale] = useState(false);
    function logout() {
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        sessionStorage.removeItem("id");
        sessionStorage.removeItem("token");
        toast.success("Até logo! Você saiu da sua conta.")
        navigate("/");
    }
    return (
        <div className={styles.options}>
            <FaleConoscoPopup abrir={abrirFale} fechar={() => setAbrirFale(false)} />
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
                    <h1>Opções</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>
                <div className={styles.options1}>
                    <div className={styles.faq}>
                        <button onClick={() => alert("EM BREVE")}><img src={faqicon} alt="" /> Guia de uso</button>

                    </div>
                    <div className={styles.suporte}>
                        <button onClick={() => {
                            fechar();
                            setAbrirFale(true);
                        }}><img src={suporteicon} alt="" /> Fale conosco</button>

                    </div>
                    <div className={styles.deslog}>
                        <button onClick={logout}>  <img src={iconelogout} alt="" /> Deslogar</button>
                    </div>
                </div>


            </Modal>
        </div>
    );
}
