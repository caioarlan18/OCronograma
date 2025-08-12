import styles from './TermosPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../images/closeicon.svg';

Modal.setAppElement('#root');

export function TermosPopup({ abrir, fechar }) {
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
                    <h1>Termos de uso</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>

                <div className={styles.options1}>
                    <p><strong>Última atualização:</strong> 13 de agosto de 2025</p>

                    <h3>1. Aceitação dos Termos</h3>
                    <p>Ao acessar e utilizar a plataforma de estudos “O CRONOGRAMA”, o usuário declara que leu, compreendeu e concorda integralmente com as disposições deste Termo de Uso e com a Política de Privacidade disponível no mesmo ambiente. Caso não concorde com qualquer cláusula, o usuário deverá interromper o uso da plataforma imediatamente.</p>

                    <h3>2. Definições</h3>
                    <p><strong>Plataforma:</strong> ambiente virtual de aprendizagem “O CRONOGRAMA”.<br />
                        <strong>Usuário:</strong> qualquer pessoa física ou jurídica cadastrada na plataforma.<br />
                        <strong>Conteúdo:</strong> todo material disponibilizado na plataforma, incluindo, mas não se limitando a, textos, vídeos, áudios, documentos, cronogramas, simulados e exercícios.</p>

                    <h3>3. Cadastro e Acesso</h3>
                    <ul>
                        <li>O acesso à plataforma requer cadastro prévio, fornecendo informações verdadeiras, completas e atualizadas.</li>
                        <li>O usuário é responsável por manter a confidencialidade de seu login e senha, não devendo compartilhá-los com terceiros.</li>
                        <li>A plataforma se reserva o direito de suspender ou cancelar contas que apresentem indícios de uso indevido, fraude ou violação deste Termo.</li>
                    </ul>

                    <h3>4. Uso da Plataforma</h3>
                    <ul>
                        <li>O conteúdo é disponibilizado exclusivamente para fins educacionais, de uso pessoal e intransferível.</li>
                        <li>É expressamente proibido:
                            <ul>
                                <li>Copiar, distribuir, vender, revender ou explorar comercialmente qualquer conteúdo da plataforma, no todo ou em parte;</li>
                                <li>Utilizar scripts, robôs ou quaisquer meios automatizados para acessar o conteúdo;</li>
                                <li>Violar direitos de propriedade intelectual da plataforma ou de terceiros.</li>
                            </ul>
                        </li>
                    </ul>

                    <h3>5. Propriedade Intelectual</h3>
                    <p>Todo o conteúdo disponibilizado é de titularidade exclusiva de “O CRONOGRAMA” ou de seus licenciantes, protegido pelas leis de direitos autorais e propriedade intelectual. A utilização indevida poderá acarretar medidas judiciais, inclusive indenização por perdas e danos.</p>

                    <h3>6. Planos, Pagamentos e Cancelamentos</h3>
                    <ul>
                        <li>Alguns conteúdos e funcionalidades são oferecidos mediante pagamento, conforme planos descritos no site/plataforma.</li>
                        <li>O não pagamento poderá implicar suspensão ou cancelamento do acesso.</li>
                        <li>O usuário poderá solicitar cancelamento conforme as regras informadas no momento da contratação.</li>
                        <li>“O CRONOGRAMA” reserva-se o direito de alterar os valores das mensalidades a qualquer momento, exceto para usuários que tenham contratado planos anuais, semestrais ou trimestrais.</li>
                    </ul>

                    <h3>7. Responsabilidades e Limitações</h3>
                    <p>A plataforma envidará esforços para manter o funcionamento contínuo, porém não se responsabiliza por interrupções decorrentes de manutenção, falhas técnicas ou eventos fora de seu controle. O desempenho nos estudos depende exclusivamente do esforço e dedicação do usuário, não havendo garantia de aprovação em concursos ou exames.</p>

                    <h3>8. Alterações nos Termos</h3>
                    <p>A plataforma poderá alterar este Termo a qualquer momento, mediante publicação da versão atualizada. O uso continuado da plataforma após a alteração implica concordância com as novas condições.</p>

                    <h3>9. Foro</h3>
                    <p>Fica eleito o foro da comarca de Rio de Janeiro para dirimir quaisquer controvérsias oriundas deste Termo.</p>

                    <hr />

                    <h2>POLÍTICA DE PRIVACIDADE – “O CRONOGRAMA”</h2>
                    <p><strong>Última atualização:</strong> 12 de agosto de 2025</p>

                    <h3>1. Disposições Gerais</h3>
                    <p>Esta Política de Privacidade descreve como “O CRONOGRAMA” coleta, utiliza, armazena e protege os dados pessoais de seus usuários, em conformidade com a LGPD.</p>

                    <h3>2. Dados Coletados</h3>
                    <ul>
                        <li>Nome completo</li>
                        <li>E-mail</li>
                        <li>Telefone</li>
                        <li>CPF</li>
                        <li>Endereço</li>
                        <li>Dados de pagamento</li>
                        <li>Informações de acesso e uso da plataforma</li>
                    </ul>

                    <h3>3. Finalidade do Tratamento</h3>
                    <ul>
                        <li>Fornecer acesso à plataforma</li>
                        <li>Processar pagamentos</li>
                        <li>Emitir notas fiscais</li>
                        <li>Melhorar a experiência do usuário</li>
                        <li>Cumprir obrigações legais e regulatórias</li>
                    </ul>

                    <h3>4. Compartilhamento de Dados</h3>
                    <p>Os dados poderão ser compartilhados apenas com parceiros e prestadores de serviço essenciais ou mediante exigência legal.</p>

                    <h3>5. Armazenamento e Segurança</h3>
                    <p>Adotamos medidas técnicas e administrativas para proteger os dados contra acesso não autorizado, uso indevido, perda ou destruição.</p>

                    <h3>6. Direitos do Titular dos Dados</h3>
                    <p>O usuário poderá, a qualquer momento, confirmar a existência de tratamento de seus dados, acessar, corrigir, atualizar ou solicitar exclusão, observadas as obrigações legais.</p>

                    <h3>7. Alterações na Política</h3>
                    <p>Podemos alterar esta Política de Privacidade a qualquer momento, mediante publicação da versão atualizada na plataforma.</p>

                    <h3>8. Contato</h3>
                    <p>Para dúvidas ou solicitações, envie um e-mail para: <strong>suporte@ocronograma.com</strong></p>
                </div>
            </Modal>
        </div>
    );
}
