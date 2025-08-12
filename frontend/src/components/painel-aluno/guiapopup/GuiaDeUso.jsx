import styles from './GuiaDeUso.module.css';
import Modal from 'react-modal';
import closeicon from '../../../images/closeicon.svg';


Modal.setAppElement('#root');

export function GuiaDeUso({ abrir, fechar }) {
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
                    <h1>Guia de uso</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/xZYChbOXFUQ" target="_blank" rel="noopener noreferrer"><h1>Como acessar seu cronograma?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/763M6Dd-hBA" target="_blank" rel="noopener noreferrer"><h1>Como estudar a teoria pelo seu material?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/Vq9UDBx3Ikc" target="_blank" rel="noopener noreferrer"><h1>Como estudar TEORIA no site do TEC CONCURSOS?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/eQGv2AbT6uI" target="_blank" rel="noopener noreferrer"><h1>Como criar uma pasta para salvar os cadernos no TEC?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/YY9rCi3TJ_0" target="_blank" rel="noopener noreferrer"><h1>Como fazer as questões e o CADERNO DE ERROS?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/yGRqXPP-gSY" target="_blank" rel="noopener noreferrer"><h1>Como estudar a lei seca no Cronograma?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/IssZKr_3CMg" target="_blank" rel="noopener noreferrer"><h1>Como REVISAR pelo OCRONOGRAMA?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/zC9M5Vg9690" target="_blank" rel="noopener noreferrer"><h1>Atrasei o meu Cronograma. O que fazer?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/4kucF5V1bFU" target="_blank" rel="noopener noreferrer"><h1>Quero Mudar o meu Cronograma. O que fazer?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/iDzQ1RO-SUo" target="_blank" rel="noopener noreferrer"><h1>DÚVIDAS / ALINHAMENTO / MENTORIA - Como funciona?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/Mpay43E29Yg" target="_blank" rel="noopener noreferrer"><h1>Como FAVORITAR questões de forma eficiente no Tec Concursos?</h1></a>
                </div>
                <div className={styles.options1}>
                    <a href="https://youtu.be/4gEu8Lm7bHE" target="_blank" rel="noopener noreferrer"><h1>Como Cadastrar o CUPOM no Tec Concursos?</h1></a>
                </div>

            </Modal>
        </div>
    );
}
