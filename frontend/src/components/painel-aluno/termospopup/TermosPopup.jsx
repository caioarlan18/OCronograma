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
                    <p><strong>Última atualização:</strong> 11 de junho de 2026</p>

                    <h2>TERMOS DE USO – “O CRONOGRAMA”</h2>
                    <p><strong>1. Aceitação dos Termos</strong> Ao acessar e utilizar a plataforma de estudos “O CRONOGRAMA”, o usuário declara que leu, compreendeu e concorda integralmente com as disposições deste Termo de Uso e com a Política de Privacidade disponível no mesmo ambiente. Caso não concorde com qualquer cláusula, deverá interromper o uso da plataforma imediatamente.</p>

                    <p><strong>2. Definições</strong><br />
                        <strong>Plataforma:</strong> ambiente virtual de aprendizagem “O CRONOGRAMA”.<br />
                        <strong>Usuário:</strong> pessoa física ou jurídica cadastrada na plataforma.<br />
                        <strong>Conteúdo:</strong> todo material disponibilizado, incluindo, mas não se limitando a, textos, vídeos, áudios, documentos, cronogramas, simulados e exercícios.</p>

                    <p><strong>3. Cadastro e Acesso</strong><br />
                        O acesso à plataforma requer cadastro prévio, com informações verdadeiras, completas e atualizadas.<br />
                        O usuário é responsável por manter a confidencialidade de seu login e senha, sendo vedado o compartilhamento com terceiros.<br />
                        A plataforma poderá suspender ou cancelar contas em caso de uso indevido, fraude ou violação destes Termos.</p>

                    <p><strong>4. Uso da Plataforma</strong><br />
                        O conteúdo é disponibilizado exclusivamente para fins educacionais, de uso pessoal e intransferível.</p>
                    <ul>
                        <li>É expressamente proibido:
                            <ul>
                                <li>a) copiar, distribuir, vender, revender ou explorar comercialmente qualquer conteúdo, no todo ou em parte;</li>
                                <li>b) utilizar robôs, scripts ou meios automatizados para acesso ao conteúdo;</li>
                                <li>c) violar direitos de propriedade intelectual da plataforma ou de terceiros.</li>
                            </ul>
                        </li>
                    </ul>

                    <p><strong>5. Propriedade Intelectual</strong> Todo o conteúdo é de titularidade exclusiva de “O CRONOGRAMA” ou de seus licenciantes, protegido pelas leis de direitos autorais e propriedade intelectual. O uso indevido poderá gerar responsabilização civil e judicial.</p>

                    <p><strong>6. Planos, Pagamentos e Cancelamentos</strong><br />
                        Alguns conteúdos e funcionalidades são oferecidos mediante pagamento, conforme os planos disponíveis.<br />
                        O inadimplemento poderá resultar na suspensão ou cancelamento do acesso.<br />
                        Nos planos mensais, o cancelamento pode ser solicitado a qualquer momento.<br />
                        Nos planos trimestrais, semestrais ou anuais, o reembolso poderá ser solicitado no prazo legal de 7 (sete) dias após a contratação.<br />
                        “O CRONOGRAMA” poderá alterar valores futuros, sem afetar planos já contratados dentro do período vigente.</p>

                    <p><strong>7. Responsabilidades e Limitações</strong> A plataforma envidará esforços para manter seu funcionamento contínuo, mas não se responsabiliza por interrupções decorrentes de manutenção, falhas técnicas ou eventos fora de seu controle. O desempenho do usuário depende exclusivamente de seu esforço e dedicação, não havendo garantia de aprovação em concursos ou exames.</p>

                    <p><strong>8. Alterações nos Termos</strong> Este Termo poderá ser alterado a qualquer momento, mediante publicação da versão atualizada. O uso continuado da plataforma implica aceitação das novas condições.</p>

                    <p><strong>9. Recomendação de Plataforma de Questões</strong> Recomendamos que o aluno utilize plataforma de questões parceira, como o TEC Concursos, para melhor aproveitamento do método e realização das questões propostas.</p>

                    <p><strong>10. Foro</strong> Fica eleito o foro da comarca do Rio de Janeiro para dirimir quaisquer controvérsias decorrentes deste Termo.</p>

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
