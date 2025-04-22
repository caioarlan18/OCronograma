import { MenuLateral } from '../../menu-lateral/MenuLateral';
import styles from './CriarCronograma2.module.css';
import { useParams } from 'react-router-dom';
export function CriarCronograma2() {
    const params = useParams();
    return (
        <div>
            <MenuLateral ativo={2} />
            {params.idCronograma}
        </div>
    )
}