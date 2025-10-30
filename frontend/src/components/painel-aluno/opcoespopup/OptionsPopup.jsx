import styles from './OptionsPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../images/closeicon.svg';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iconetermos from '../../../images/termosicon.svg';
import faqicon from '../../../images/faq.svg';
import suporteicon from '../../../images/suporteicon.svg';
import { FaleConoscoPopup } from '../faleconosco-popup/FaleConoscoPopUp';
import { GuiaDeUso } from '../guiapopup/GuiaDeUso';
import { TermosPopup } from '../termospopup/TermosPopup';

Modal.setAppElement('#root');

export function OptionsPopup({ abrir, fechar }) {
    const navigate = useNavigate();
    const [abrirFale, setAbrirFale] = useState(false);
    const [abrirGuia, setAbrirGuia] = useState(false);
    const [abrirTermos, setAbrirTermos] = useState(false);
    return (
        <div className={styles.options}>
            <FaleConoscoPopup abrir={abrirFale} fechar={() => setAbrirFale(false)} />
            <GuiaDeUso abrir={abrirGuia} fechar={() => setAbrirGuia(false)} />
            <TermosPopup abrir={abrirTermos} fechar={() => setAbrirTermos(false)} />
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
                        borderRadius: '12px',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <div className={styles.header}>
                    <h1>Opções</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>
                <div className={styles.options1}>
                    <div className={styles.suporte}>
                        <button onClick={() => {
                            fechar();
                            setAbrirFale(true);
                        }}><img src={suporteicon} alt="" />Suporte</button>

                    </div>
                    <div className={styles.faq}>
                        <button onClick={() => { fechar(); setAbrirGuia(true) }}><img src={faqicon} alt="" /> Guia de uso</button>

                    </div>
                    <div className={styles.suporte}>
                        <button onClick={() => {
                            fechar();
                            setAbrirTermos(true);
                        }}><img src={iconetermos} alt="" /> Termos de uso</button>

                    </div>
                    <div className={styles.suporte}>
                        <button onClick={() => {
                            window.open("https://chat.whatsapp.com/EvNc7LMpSaU6nLD1rXPFCy?mode=wwt")
                        }}>Comunidade de alunos</button>

                    </div>
                </div>


            </Modal>
        </div>
    );
}
