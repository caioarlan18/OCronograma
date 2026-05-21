import styles from './ResumoPopup.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function ResumoPopup({ abrir, fechar, resumo }) {
    return (
        <div className={styles.resumo}>
            <Modal
                isOpen={abrir}
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
                    <h1>Resumo</h1>
                </div>
                <div className={styles.content}>
                    <p>{resumo}</p>
                </div>
                <div className={styles.footer}>
                    <button onClick={fechar}>Fechar</button>
                </div>
            </Modal>
        </div>
    );
}
