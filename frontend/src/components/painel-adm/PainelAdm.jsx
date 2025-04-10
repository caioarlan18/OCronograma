import { MenuLateral } from '../menu-lateral/MenuLateral';
import styles from './PainelAdm.module.css';
export function PainelAdm() {
    return (
        <div className={styles.paineladm}>
            <MenuLateral ativo={1} />

        </div>

    )
}