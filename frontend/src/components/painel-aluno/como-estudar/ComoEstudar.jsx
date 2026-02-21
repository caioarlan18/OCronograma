import { MenuLateralAluno } from "../menu-lateral-aluno/MenuLateralAluno"
import styles from "./ComoEstudar.module.css"

export function ComoEstudar() {

    const videos = [
        { titulo: "Como acessar seu cronograma?", link: "https://youtu.be/xZYChbOXFUQ" },
        { titulo: "Como estudar a teoria pelo seu material?", link: "https://youtu.be/763M6Dd-hBA" },
        { titulo: "Como estudar TEORIA no site do TEC CONCURSOS?", link: "https://youtu.be/Vq9UDBx3Ikc" },
        { titulo: "Como criar uma pasta para salvar os cadernos no TEC?", link: "https://youtu.be/eQGv2AbT6uI" },
        { titulo: "Como fazer as questões e o CADERNO DE ERROS?", link: "https://youtu.be/YY9rCi3TJ_0" },
        { titulo: "Como estudar a lei seca no Cronograma?", link: "https://youtu.be/yGRqXPP-gSY" },
        { titulo: "Como REVISAR pelo OCRONOGRAMA?", link: "https://youtu.be/IssZKr_3CMg" },
        { titulo: "Atrasei o meu Cronograma. O que fazer?", link: "https://youtu.be/zC9M5Vg9690" },
        { titulo: "Quero mudar o meu Cronograma. O que fazer?", link: "https://youtu.be/4kucF5V1bFU" },
        { titulo: "Dúvidas / alinhamento / mentoria - como funciona?", link: "https://youtu.be/iDzQ1RO-SUo" },
        { titulo: "Como favoritar questões no Tec Concursos?", link: "https://youtu.be/Mpay43E29Yg" },
        { titulo: "Como cadastrar o cupom no Tec Concursos?", link: "https://youtu.be/4gEu8Lm7bHE" },
    ]

    return (
        <div className={styles.estudar}>
            <MenuLateralAluno ativo={1} />

            <main className={styles.conteudo}>
                <header className={styles.topo}>
                    <h1 className={styles.titulo}>Guia de uso</h1>
                    <p className={styles.subtitulo}>
                        Assista aos vídeos abaixo para aprender a usar seu cronograma da forma mais eficiente possível.
                    </p>
                </header>

                <section className={styles.grid}>
                    {videos.map((video, index) => (
                        <a
                            key={index}
                            href={video.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.card}
                        >
                            <div className={styles.cardIcon}>▶</div>
                            <h2 className={styles.cardTitulo}>{video.titulo}</h2>
                            <span className={styles.cardLink}>Assistir vídeo</span>
                        </a>
                    ))}
                </section>
            </main>
        </div>
    )
}