import { useState } from 'react';
import { MenuLateral } from '../../menu-lateral/MenuLateral';
import { CriarUsuarioPopup } from '../criar-usuario/CriarUsuarioPopup';
import styles from './GerenciarUsuarios.module.css';
export function GerenciarUsuarios() {
    const [aberto, setAberto] = useState(false);
    function abrir() {
        setAberto(true);
    }
    return (
        <div className={styles.gerenciar}>
            <MenuLateral ativo={4} />
            <div className={styles.gerenciar1}>
                <div className={styles.gerenciar2}>
                    <input type="text" placeholder='Pesquise o usuário por nome ou email' />
                    <button onClick={abrir}>+ Criar usuário</button>
                </div>
                <div>
                    <CriarUsuarioPopup abrir={aberto} fechar={() => setAberto(false)} />
                </div>
            </div>
        </div>
    )
}