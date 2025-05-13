import styles from './OptionsPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../images/closeicon.svg';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconelogout from '../../../images/logoutaluno.svg';
import faqicon from '../../../images/faq.svg';
import suporteicon from '../../../images/suporteicon.svg';

Modal.setAppElement('#root');

export function OptionsPopup({ abrir, fechar }) {
    const navigate = useNavigate();
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
                        <button onClick={() => window.open("https://api.whatsapp.com/send/?phone=5521981780957&text=Venho+do+sistema+OCronograma+e+preciso+de+ajuda.&type=phone_number&app_absent=0", "_blank")}><img src={suporteicon} alt="" /> Fale conosco</button>

                    </div>
                    <div className={styles.deslog}>
                        <button onClick={logout}>  <img src={iconelogout} alt="" /> Deslogar</button>
                    </div>
                </div>


            </Modal>
        </div>
    );
}
