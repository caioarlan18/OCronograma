import { useState, useEffect } from 'react';
import { MenuLateral } from '../../menu-lateral/MenuLateral';
import { CriarUsuarioPopup } from '../criar-usuario/CriarUsuarioPopup';
import styles from './GerenciarUsuarios.module.css';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import { EditarUsuarioPopup } from '../editar-usuario/EditarUsuario';

export function GerenciarUsuarios() {
    const [abertoCriar, setAbertoCriar] = useState(false);
    const [abertoEditar, setAbertoEditar] = useState(false);
    const [idUsuarioEditar, setIdUsuarioEditar] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [userRole, setUserRole] = useState("");
    const [busca, setBusca] = useState("");

    function abrir() {
        setAbertoCriar(true);
    }

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await api.get("/user/read");
                setUsuarios(response.data.reverse());
            } catch (error) {
                toast.error(error.response.data.msg);

            }
        }
        loadUsers();
    }, [abertoCriar, abertoEditar]);

    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const usuariosFiltrados = usuarios.filter(usuario =>
        usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
        usuario.email.toLowerCase().includes(busca.toLowerCase())
    );

    return (
        <div className={styles.gerenciar}>
            <MenuLateral ativo={4} />
            <CriarUsuarioPopup abrir={abertoCriar} fechar={() => setAbertoCriar(false)} />
            <EditarUsuarioPopup abrir={abertoEditar} fechar={() => setAbertoEditar(false)} idUser={idUsuarioEditar} roleUser={userRole} />

            <div className={styles.gerenciar1}>
                <div className={styles.gerenciar2}>
                    <input
                        type="text"
                        placeholder='Pesquise o usuário por nome ou email'
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
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
                            {usuariosFiltrados.map((usuario, index) => (
                                <tr key={index} className={index % 2 === 0 ? styles.par : styles.impar}>
                                    <td data-label="Nome do usuário">{usuario.nome}</td>
                                    <td data-label="Email do usuário">{usuario.email}</td>
                                    <td data-label="Validade de acesso">{formatarData(usuario.validade)}</td>
                                    <td data-label="Data de criação">{formatarData(usuario.createdAt)}</td>
                                    <td data-label="Cronogramas vinculados">{usuario.cronogramaAssociado || "Nenhum"}</td>
                                    <td data-label="Ações">
                                        <button className={styles.botao} onClick={() => {
                                            setAbertoEditar(true);
                                            setIdUsuarioEditar(usuario._id);
                                        }}>Editar</button>
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
