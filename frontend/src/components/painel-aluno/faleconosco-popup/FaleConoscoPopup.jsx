import styles from './FaleConoscoPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../images/closeicon.svg';


Modal.setAppElement('#root');

export function FaleConoscoPopup({ abrir, fechar }) {
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
                    <h1>Fale Conosco</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>
                <div>

                </div>
                <div className={styles.options1}>
                    <h1>DÚVIDAS GERAIS</h1>
                    <p>suporte@ocronograma.com</p>

                </div>
                <div className={styles.options1}>
                    <h1>ASSUNTOS FINANCEIROS</h1>
                    <p>financeiro@ocronograma.com</p>
                </div>


            </Modal>
        </div>
    );
}
