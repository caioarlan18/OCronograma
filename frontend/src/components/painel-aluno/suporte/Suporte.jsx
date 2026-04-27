import { MenuLateralAluno } from '../menu-lateral-aluno/MenuLateralAluno'
import { TermosPopup } from '../termospopup/TermosPopup';
import styles from './Suporte.module.css'
import { useState } from 'react';
export function Suporte() {
    const [abrirPopup, setAbrirPopup] = useState(false);

    return (
        <div className={styles.suporte}>
            <TermosPopup abrir={abrirPopup} fechar={() => setAbrirPopup(false)} />
            <MenuLateralAluno ativo={5} />

            <main className={styles.conteudo}>
                <header className={styles.topo}>
                    <h1 className={styles.titulo}>Suporte</h1>
                    <p className={styles.subtitulo}>
                        Precisa de ajuda com seu cronograma? Escolha uma opção abaixo.
                    </p>
                </header>

                <section className={styles.card}>
                    <ol className={styles.lista}>
                        <li className={styles.item}>
                            <h2 className={styles.itemTitulo}>Suporte/Direcionamento/Dúvidas</h2>
                            <p className={styles.texto}>
                                Fale comigo no WhatsApp abaixo 💜
                            </p>

                            <a
                                className={styles.linkDestaque}
                                href="http://wa.me/5521969144126"
                                target="_blank"
                                rel="noreferrer"
                            >
                                (21) 96914-4126
                            </a>
                        </li>

                        {/* <li className={styles.item}>
                            <h2 className={styles.itemTitulo}>Mentoria Semanal</h2>
                            <p className={styles.texto}>
                                Participe dos nossos encontros de tira-dúvidas no link abaixo:
                            </p>

                            <a
                                className={styles.link}
                                href="https://meet.google.com/vqs-yyyv-xak"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Quarta-feira 16h: https://meet.google.com/vqs-yyyv-xak
                            </a>
                            <br />
                            <br />
                            <a
                                className={styles.link}
                                href="https://meet.google.com/ian-ofrq-nbc"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Sábado 7h: https://meet.google.com/ian-ofrq-nbc
                            </a>

                            <div className={styles.boxInfo}>
                                <p className={styles.infoLinha}>
                                    <strong>Tira-dúvidas:</strong> toda terça, <strong>14h</strong>
                                </p>
                                <p className={styles.infoLinha}>
                                    <strong>Alinhamento com a Marcelle:</strong> todo sábado, <strong>6h da manhã</strong> (mesmo link)
                                </p>
                            </div> 
                        </li> */}

                        <li className={styles.item}>
                            <h2 className={styles.itemTitulo}>Quer solicitar a mudança do seu cronograma?</h2>
                            <p className={styles.texto}>Solicite aqui:</p>

                            <a
                                className={styles.link}
                                href="https://docs.google.com/forms/d/e/1FAIpQLSf5DXn5-cMTgjaHF9P9vOZp_SyBwc9aZY6aTQRtF5d8ITkomw/viewform"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Abrir formulário de solicitação
                            </a>
                        </li>
                    </ol>

                    <div className={styles.rodapeCard}>
                        <button
                            type="button"
                            className={styles.botaoTermos}
                            onClick={() => setAbrirPopup(true)}
                        >
                            Termos de uso
                        </button>
                    </div>
                </section>
            </main>
        </div>
    )
}