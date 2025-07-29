import { MenuLateralAluno } from '../menu-lateral-aluno/MenuLateralAluno';
import styles from './EstatisticasAluno.module.css';
export function EstatisticasAluno() {
    return (
        <div className={styles.estati}>
            <MenuLateralAluno ativo={3} />
        </div>
    )
}