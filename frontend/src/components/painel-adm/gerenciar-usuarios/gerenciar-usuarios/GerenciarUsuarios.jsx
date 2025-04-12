import { useState, useEffect } from 'react';
import { MenuLateral } from '../../menu-lateral/MenuLateral';
import { CriarUsuarioPopup } from '../criar-usuario/CriarUsuarioPopup';
import styles from './GerenciarUsuarios.module.css';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';

export function GerenciarUsuarios() {
    const [aberto, setAberto] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    function abrir() {
        setAberto(true);
    }
    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await api.get("/user/read");
                setUsuarios(response.data);
            } catch (error) {
                toast.error(error.response.data.msg);
            }
        }
        loadUsers();
    }, [aberto])
    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }
    return (
        <div className={styles.gerenciar}>
            <MenuLateral ativo={4} />
            <CriarUsuarioPopup abrir={aberto} fechar={() => setAberto(false)} />
            <div className={styles.gerenciar1}>
                <div className={styles.gerenciar2}>
                    <input type="text" placeholder='Pesquise o usuário por nome ou email' />
                    <button onClick={abrir}>+ Criar usuário</button>
                </div>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1>Gerencie Usuários</h1>
                    </div>
                    <table className={styles.tabela}>
                        <thead>
                            <tr>
                                <th>Nome do usuário</th>
                                <th>Email do usuário</th>
                                <th>Validade de acesso</th>
                                <th>Data de criação</th>
                                <th>Cronogramas vinculados</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {usuarios.map((usuario, index) => (
                                <tr key={index} className={index % 2 === 0 ? styles.par : styles.impar}>
                                    <td data-label="Nome do usuário">{usuario.nome}</td>
                                    <td data-label="Email do usuário">{usuario.email}</td>
                                    <td data-label="Validade de acesso">{formatarData(usuario.validade)}</td>
                                    <td data-label="Data de criação">{formatarData(usuario.createdAt)}</td>
                                    <td data-label="Cronogramas vinculados">{usuario.cronogramaAssociado || "Nenhum"}</td>
                                    <td data-label="Ações">
                                        <button className={styles.botao}>Editar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}