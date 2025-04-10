import styles from './MenuLateral.module.css';
import logocronogramabranco from '../../images/logocronogramabranco.png';
import iconemais from '../../images/iconemais.svg';
import iconecamadas from '../../images/iconecamadas.svg';
import iconeuser from '../../images/iconeuser.svg'
import { Link } from 'react-router-dom';
export function MenuLateral({ ativo }) {
    return (
        <div className={styles.sidebar}>
            <div className={ativo === 1 ? styles.ativo2 : styles.sidebar1}>
                <img src={logocronogramabranco} alt="logo-cronograma-branco" />
            </div>

            <div className={styles.sidebar2}>
                <div className={ativo === 2 ? styles.ativo : styles.sidebar3}>
                    <img src={iconemais} alt="" />
                    <Link >Criar Cronograma</Link>
                </div>
                <div className={ativo === 3 ? styles.ativo : styles.sidebar3}>
                    <img src={iconecamadas} alt="" />
                    <Link >Gerenciar Cronogramas</Link>

                </div>
                <div className={ativo === 4 ? styles.ativo : styles.sidebar3}>
                    <img src={iconeuser} alt="" />
                    <Link >Gerenciar Usuários</Link>
                </div>
            </div>


        </div>
    )
}