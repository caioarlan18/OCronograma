import styles from './AvisoPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../images/closeicon.svg';
import { useState } from 'react';

Modal.setAppElement('#root');

export function AvisoPopup({ abrir, onAceitar }) {
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
                    <h1>💜 Uma novidade importante sobre o nosso suporte!</h1>
                </div>
                <div className={styles.options1}>
                    <p>
                        Turma, quero contar uma mudança que fizemos para deixar o acompanhamento de vocês ainda mais organizado e eficiente. 🥰
                        <br /><br />
                        A partir de agora, todas as dúvidas relacionadas ao concurso, estudos, planejamento, estratégia de preparação e orientações da mentoria deverão ser enviadas pelo nosso formulário de dúvidas.
                        <br /><br />
                        📚 Por que estamos fazendo isso?
                        <br /><br />
                        Porque assim conseguimos reunir todas as dúvidas em um único lugar e levá-las para os nossos encontros semanais de suporte, garantindo que cada questão seja analisada com calma e que ninguém fique sem resposta.
                        <br /><br />
                        ✨ E se você não puder participar do encontro?
                        <br /><br />
                        Sem problema! A sua dúvida será respondida e a orientação será enviada para o e-mail cadastrado no formulário. 💌
                        <br /><br />
                        📌 IMPORTANTE: questões relacionadas a boleto, mensalidade e cupom do TEC não precisam passar pelo formulário. Esses assuntos podem continuar sendo enviados diretamente para:
                        <br /><br />
                        📧 <a href="mailto:suporte@ocronograma.com">suporte@ocronograma.com</a>
                        <br /><br />
                        📝 E para solicitar um novo cronograma, também teremos um formulário específico. Dessa forma, conseguimos organizar cada solicitação e preparar o cronograma de vocês da melhor maneira possível.
                        <br /><br />
                        Conto com a colaboração de vocês nessa nova organização! 💜
                        <br /><br />
                        Essa mudança foi pensada justamente para que o nosso suporte fique mais organizado, mais eficiente e, principalmente, para que vocês tenham a segurança de que suas dúvidas serão acompanhadas e respondidas.
                        <br /><br />
                        Estamos juntos nessa caminhada! 🚀📚
                        <br />
                        Vamos em busca da aprovação! 💜

                    </p>
                </div>
                <div className={styles.options1}>
                    <input type="checkbox" checked={entendi} onChange={(e) => setEntendi(e.target.checked)} />
                    <span>Li e entendi</span>


                </div>
                <div className={styles.options1}>
                    <button style={entendi ? {} : { background: '#5a535342' }} onClick={() => entendi ? onAceitar() : null}>Concordo e continuar</button>
                </div>




            </Modal>
        </div>
    );
}
