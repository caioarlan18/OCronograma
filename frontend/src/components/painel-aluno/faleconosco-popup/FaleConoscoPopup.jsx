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
                    <h1>Fale Conosco</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>
                <div>

                </div>
                <div className={styles.options1}>
                    <h1>Erro em link</h1>
                    <p>suporte@ocronograma.com</p>
                </div>
                <div className={styles.options1}>
                    <h1>Desconto do tec/financeiro</h1>
                    <a href="http://wa.me/5521981780957" target='_blank'>(21) 98178-0957</a>
                </div>
                <div className={styles.options1}>
                    <h1>Orientações de estudo</h1>
                    <a href="http://wa.me/5521971307167" target='_blank'>(21) 97130-7167</a>
                </div>



            </Modal>
        </div>
    );
}
