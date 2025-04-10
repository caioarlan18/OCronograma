import { MenuLateral } from "../../menu-lateral/MenuLateral";
import styles from './CriarCronograma1.module.css';
export function CriarCronograma1() {
    return (
        <div className={styles.cronograma1}>
            <MenuLateral ativo={2} />
            <h1>criar 1</h1>
        </div>
    )
}