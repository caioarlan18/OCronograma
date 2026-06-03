import { useEffect, useState } from 'react';
import styles from './ResumoPopup.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function ResumoPopup({ abrir, fechar, resumo }) {
    const [fullscreen, setFullscreen] = useState(false);

    useEffect(() => {
        if (!abrir) {
            setFullscreen(false);
        }
    }, [abrir]);

    function toggleFullscreen() {
        setFullscreen((current) => !current);
    }

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
                        width: fullscreen ? '95vw' : 'min(600px, 90vw)',
                        maxWidth: fullscreen ? '95vw' : 'min(600px, 90vw)',
                        height: fullscreen ? '95vh' : 'auto',
                        maxHeight: fullscreen ? '95vh' : '80vh',
                        overflowY: 'auto',
                        border: 'none',
                        background: '#fff',
                        boxSizing: 'border-box',
                    },
                }}
            >
                <div className={styles.header}>
                    <h1>Resumo</h1>
                    <div className={styles.actionButtons}>
                        <button type="button" onClick={toggleFullscreen} className={styles.iconButton} aria-label={fullscreen ? 'Sair da tela cheia' : 'Expandir'}>
                            {fullscreen ? '⤡' : '⤢'}
                        </button>
                        <button type="button" onClick={fechar} className={styles.iconButton} aria-label="Fechar">
                            ×
                        </button>
                    </div>
                </div>
                <div className={styles.content}>
                    <p>{resumo}</p>
                </div>
            </Modal>
        </div>
    );
}
