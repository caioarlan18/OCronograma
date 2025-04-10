import { MenuLateral } from '../menu-lateral/MenuLateral';
import styles from './PainelAdmFeed.module.css';
export function PainelAdmFeed() {
    return (
        <div className={styles.paineladm}>
            <MenuLateral ativo={1} />

        </div>

    )
}