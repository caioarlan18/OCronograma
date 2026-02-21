import styles from './AvisoPermaPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../images/closeicon.svg';
import { useState } from 'react';

Modal.setAppElement('#root');

export function AvisoPermaPopup({ abrir, fechar }) {
    const [entendi, setEntendi] = useState(false);

    return (
        <div className={styles.options}>

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
                    <h1>Aviso importante</h1>
                </div>
                <div className={styles.options1}>
                    <p>
                        Querido aluno 💜 Marcelle Souza aqui!
                        <br /><br />
                        A partir de agora, todo o nosso atendimento será feito exclusivamente pelo WhatsApp oficial da empresa.
                        <br /><br />
                        Essa mudança vai nos ajudar a oferecer um suporte mais rápido, organizado e com ainda mais qualidade pra você! 🚀
                        <br /><br />
                        Salve o novo número e fale com a gente por lá sempre que precisar:
                        📱 <a href="https://wa.me/5521981780957">(21) 98178-0957</a>
                        <br /><br />
                        Obrigada pela compreensão e por fazer parte do Ocronograma! 💪✨

                    </p>
                </div>
                <div className={styles.options1}>
                    <input type="checkbox" checked={entendi} onChange={(e) => setEntendi(e.target.checked)} />
                    <span>Li e entendi</span>


                </div>
                <div className={styles.options1}>
                    <button style={entendi ? {} : { background: '#5a535342' }} onClick={() => entendi ? fechar() : null}>Estudar</button>
                </div>




            </Modal>
        </div>
    );
}
