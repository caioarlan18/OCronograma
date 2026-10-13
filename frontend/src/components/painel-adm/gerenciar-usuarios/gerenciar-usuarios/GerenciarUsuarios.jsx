import { useState, useEffect } from 'react';
import { MenuLateral } from '../../menu-lateral/MenuLateral';
import { CriarUsuarioPopup } from '../criar-usuario/CriarUsuarioPopup';
import styles from './GerenciarUsuarios.module.css';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import { EditarUsuarioPopup } from '../editar-usuario/EditarUsuario';
import { LoadingSpinner } from '../../../../components/common/LoadingSpinner';
import { Pagination } from '../../../../components/common/Pagination';
export function GerenciarUsuarios() {
    const [abertoCriar, setAbertoCriar] = useState(false);
    const [abertoEditar, setAbertoEditar] = useState(false);
    const [idUsuarioEditar, setIdUsuarioEditar] = useState("");
    const [usuarios, setUsuarios] = useState([]);
    const [cronogramas, setCronogramas] = useState([]);
    const [userRole, setUserRole] = useState("");
    const [busca, setBusca] = useState("");
    const [userInactive, setUserInactive] = useState(false);
    const [semAcessoDuasSemanas, setSemAcessoDuasSemanas] = useState(false);
    const [semanaNenhumaFinalizada, setSemanaNenhumaFinalizada] = useState(false);
    const [filtrarMaisSemanasFinalizadas, setFiltrarMaisSemanasFinalizadas] = useState(false);
    const [limiteSemanasFinalizadas, setLimiteSemanasFinalizadas] = useState('0');
    const [vencimentoproximo, setVencimentoProximo] = useState(false);
    const [somentePagantes, setSomentePagantes] = useState(false);
    const [somenteAtivos, setSomenteAtivos] = useState(false);
    const [somenteNovosUsuarios, setSomenteNovosUsuarios] = useState(false);
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState([]);
    const [cronogramaId, setCronogramaId] = useState("");
    const [cronograma, setCronograma] = useState({});
    const [userInadimplente, setUserInadimplente] = useState(false);
    const [semEspecialista, setSemEspecialista] = useState(false);
    const [loading, setLoading] = useState(false);
    const [itemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        async function getUserData() {
            try {
                const response = await api.get(`/user/read/${id}`);
                setUser(response.data);
            } catch (error) {
                toast.error(error);
            }
        }
        getUserData();
    }, [id]);
    useEffect(() => {
        async function getCronograma() {
            try {
                if (!cronogramaId) return setCronograma("Vazio");
                const response = await api.get(`/cronograma/read/${cronogramaId}`);
                setCronograma(response.data);
            } catch (error) {
                toast.error(error.response.data.msg);

            }
        }
        getCronograma()
    }, [cronogramaId]);
    function abrir() {
        if (user.role != "administrador" && user.role != "distribuidor") return toast.error("Baterista não pode criar usuários");
        setAbertoCriar(true);
    }

    useEffect(() => {
        async function loadUsers() {
            try {
                setLoading(true);
                const [usuariosResponse, cronogramasResponse] = await Promise.all([
                    api.get("/user/read"),
                    api.get("/cronograma/read")
                ]);
                setUsuarios(usuariosResponse.data.reverse());
                setCronogramas(cronogramasResponse.data);
                setCurrentPage(1);
            } catch (error) {
                toast.error(error.response.data.msg);
            } finally {
                setLoading(false);
            }
        }
        loadUsers();
    }, []);

    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    function alunoSemAcessoRecente(usuario) {
        if (usuario.role !== 'aluno' || !usuario.ultimoAcesso) return false;
        const diasSemAcesso = Date.now() - new Date(usuario.ultimoAcesso).getTime();
        return diasSemAcesso > 14 * 24 * 60 * 60 * 1000;
    }

    function progressoSemanal(usuario) {
        if (usuario.role !== 'aluno') return null;
        if (!usuario.cronogramaAssociado) return null;

        const cronogramaAluno = cronogramas.find(
            (cronogramaItem) => String(cronogramaItem._id) === String(usuario.cronogramaAssociado)
        );
        if (!cronogramaAluno) return { indisponivel: true };

        const historico = (usuario.historicoCronogramas || []).find(
            (item) => String(item.idCronograma) === String(cronogramaAluno._id)
        );
        const materiasRegistradas = new Set(
            (historico?.questions || [])
                .filter((question) => {
                    const temAcertos = question.acertos !== null && question.acertos !== undefined && question.acertos !== '';
                    const temErros = question.erros !== null && question.erros !== undefined && question.erros !== '';
                    return temAcertos && temErros && Number.isFinite(Number(question.acertos)) && Number.isFinite(Number(question.erros));
                })
                .map((question) => String(question.idMateria))
        );
        const semanas = (cronogramaAluno.semanas || []).filter((semana) => semana.visible);
        const concluidas = semanas.filter((semana) => {
            const materias = (semana.dias || []).flatMap((dia) => dia.conteudos || []);
            return materias.length > 0 && materias.every((materia) => materiasRegistradas.has(String(materia._id)));
        }).length;

        return { concluidas, total: semanas.length };
    }

    const agora = Date.now();
    const inicioUltimoMes = agora - 30 * 24 * 60 * 60 * 1000;
    const usuariosFiltrados = usuarios.filter(usuario => {
        const correspondeBusca =
            usuario.nome.toLowerCase().includes(busca.toLowerCase()) ||
            usuario.email.toLowerCase().includes(busca.toLowerCase()) ||
            usuario.especialista?.toLowerCase().includes(busca.toLowerCase());

        const correspondeStatus = userInactive ? usuario.status.includes("inativo") : true;
        const correspondeInatividade = semAcessoDuasSemanas ? alunoSemAcessoRecente(usuario) : true;
        const progresso = semanaNenhumaFinalizada || filtrarMaisSemanasFinalizadas
            ? progressoSemanal(usuario)
            : null;
        const correspondeSemanasZeradas = !semanaNenhumaFinalizada || progresso?.concluidas === 0;
        const limiteSemanas = Number(limiteSemanasFinalizadas);
        const correspondeMaisSemanas = !filtrarMaisSemanasFinalizadas || (
            Number.isFinite(limiteSemanas) && progresso?.concluidas > limiteSemanas
        );
        const inadimplente = userInadimplente ? usuario.inadimplente : true;
        const correspondePagamento = !somentePagantes || usuario.inadimplente === false;
        const correspondeAtivo = !somenteAtivos || usuario.status === "ativo";
        const dataUltimoAcesso = new Date(usuario.ultimoAcesso).getTime();
        const correspondeDataEntrada = !somenteNovosUsuarios || (
            Number.isFinite(dataUltimoAcesso) && dataUltimoAcesso >= inicioUltimoMes && dataUltimoAcesso <= agora
        );
        const withoutEsp = semEspecialista ? !usuario.especialista || usuario.especialista.trim() === '' : true;
        return correspondeBusca && correspondeStatus && correspondeInatividade && correspondeSemanasZeradas && correspondeMaisSemanas && inadimplente && correspondePagamento && correspondeAtivo && correspondeDataEntrada && withoutEsp;
    });

    if (vencimentoproximo) {
        usuariosFiltrados.sort((a, b) => new Date(a.validade) - new Date(b.validade));
    }
    function renderNomeCronograma(id) {
        if (!id) return "Nenhum";
        const cronogramaEncontrado = cronogramas.find(
            (item) => String(item._id) === String(id)
        );
        return cronogramaEncontrado?.nome || "Cronograma não encontrado";
    }

    // Calcular paginação
    const totalPages = Math.ceil(usuariosFiltrados.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const usuariosRenderizados = usuariosFiltrados.slice(startIndex, endIndex);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    function exportarUsuarios() {
        const escapar = (valor) => `"${String(valor ?? '').replace(/"/g, '""')}"`;
        const cabecalho = [
            'Nome',
            'Email',
            'Telefone',
            'Cargo',
            'Status',
            'Inadimplente',
            'Validade de acesso',
            'Data de criação',
            'Último acesso'
        ];
        const linhas = usuariosFiltrados.map((usuario) => [
            usuario.nome,
            usuario.email,
            usuario.telefone,
            usuario.role,
            usuario.status,
            usuario.inadimplente ? 'Sim' : 'Não',
            usuario.validade ? formatarData(usuario.validade) : '',
            usuario.createdAt ? formatarData(usuario.createdAt) : '',
            usuario.ultimoAcesso ? formatarData(usuario.ultimoAcesso) : 'Não registrado'
        ]);
        const csv = [cabecalho, ...linhas]
            .map((linha) => linha.map(escapar).join(';'))
            .join('\n');
        const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const hoje = new Date();
        const dataHoje = [
            hoje.getFullYear(),
            String(hoje.getMonth() + 1).padStart(2, '0'),
            String(hoje.getDate()).padStart(2, '0')
        ].join('-');
        link.download = `usuarios_ocronograma_${dataHoje}.csv`;
        link.click();
        URL.revokeObjectURL(url);
    }

    return (
        <div className={styles.gerenciar}>
            <MenuLateral ativo={4} />
            <CriarUsuarioPopup abrir={abertoCriar} fechar={() => setAbertoCriar(false)} />
            <EditarUsuarioPopup key={idUsuarioEditar} abrir={abertoEditar} fechar={() => setAbertoEditar(false)} idUser={idUsuarioEditar} roleUser={userRole} />

            <div className={styles.gerenciar1}>
                <div className={styles.gerenciar2}>
                    <input
                        type="text"
                        placeholder='Pesquise o usuário por nome, email ou especialista'
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}

                    /> <button onClick={abrir}>+ Criar usuário</button>
                    <button className={styles.botaoExportar} onClick={exportarUsuarios} disabled={!usuariosFiltrados.length}>
                        Exportar CSV
                    </button>
                </div>

                <div className={styles.container}>
                    <div className={styles.header}>
                        <h1>Gerencie Usuários ({usuariosFiltrados.length})</h1>
                        <div className={styles.filtros}>
                            <input type="checkbox" onClick={() => setUserInactive(!userInactive)} />
                            <label htmlFor="">Usuários inativos</label>
                        </div>
                        <div className={styles.filtros}>
                            <input
                                type="checkbox"
                                checked={semAcessoDuasSemanas}
                                onChange={(event) => {
                                    setSemAcessoDuasSemanas(event.target.checked);
                                    setCurrentPage(1);
                                }}
                            />
                            <label>Sem acesso há mais de 14 dias</label>
                        </div>
                        <div className={styles.filtros}>
                            <input
                                type="checkbox"
                                checked={semanaNenhumaFinalizada}
                                onChange={(event) => {
                                    setSemanaNenhumaFinalizada(event.target.checked);
                                    setCurrentPage(1);
                                }}
                            />
                            <label>Nenhuma semana finalizada</label>
                        </div>
                        <div className={styles.filtrosProgresso}>
                            <input
                                type="checkbox"
                                checked={filtrarMaisSemanasFinalizadas}
                                onChange={(event) => {
                                    setFiltrarMaisSemanasFinalizadas(event.target.checked);
                                    setCurrentPage(1);
                                }}
                            />
                            <label htmlFor="limite-semanas-finalizadas">Mais de</label>
                            <input
                                id="limite-semanas-finalizadas"
                                className={styles.campoSemanas}
                                type="number"
                                min="0"
                                step="1"
                                value={limiteSemanasFinalizadas}
                                onChange={(event) => {
                                    setLimiteSemanasFinalizadas(event.target.value);
                                    setCurrentPage(1);
                                }}
                                aria-label="Número de semanas concluídas"
                            />
                            <span>semanas concluídas</span>
                        </div>
                        <div className={styles.filtros}>
                            <input type="checkbox" onClick={() => setVencimentoProximo(!vencimentoproximo)} />
                            <label htmlFor="">Mais perto do vencimento</label>
                        </div>
                        <div className={styles.filtros}>
                            <input type="checkbox" onClick={() => setUserInadimplente(!userInadimplente)} />
                            <label htmlFor="">Inadimplentes</label>
                        </div>
                        <div className={styles.filtros}>
                            <input
                                type="checkbox"
                                checked={somentePagantes}
                                onChange={(event) => {
                                    setSomentePagantes(event.target.checked);
                                    setCurrentPage(1);
                                }}
                            />
                            <label>Pagantes (não inadimplentes)</label>
                        </div>
                        <div className={styles.filtros}>
                            <input
                                type="checkbox"
                                checked={somenteAtivos}
                                onChange={(event) => {
                                    setSomenteAtivos(event.target.checked);
                                    setCurrentPage(1);
                                }}
                            />
                            <label>Ativos (vigentes)</label>
                        </div>
                        <div className={styles.filtros}>
                            <input
                                type="checkbox"
                                checked={somenteNovosUsuarios}
                                onChange={(event) => {
                                    setSomenteNovosUsuarios(event.target.checked);
                                    setCurrentPage(1);
                                }}
                            />
                            <label>Entraram no sistema no último mês</label>
                        </div>
                        <div className={styles.filtros}>
                            <input type="checkbox" onClick={() => setSemEspecialista(!semEspecialista)} />
                            <label htmlFor="">Sem especialista</label>
                        </div>
                    </div>

                    {loading ? (
                        <LoadingSpinner />
                    ) : (
                        <>
                            <table className={styles.tabela}>
                                <thead>
                                    <tr>
                                        <th>Nome do usuário</th>
                                        <th>Email do usuário</th>
                                        <th>Cronograma associado</th>
                                        <th>Validade de acesso</th>
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {usuariosRenderizados.map((usuario, index) => (
                                        <tr key={index} className={index % 2 === 0 ? styles.par : styles.impar}>
                                            <td data-label="Nome do usuário">
                                                {usuario.nome}
                                                <span className={styles.alertaInatividade}>
                                                    {usuario.ultimoAcesso
                                                        ? `Último acesso: ${formatarData(usuario.ultimoAcesso)}`
                                                        : 'Acesso não registrado'}
                                                </span>
                                                {(() => {
                                                    const progresso = progressoSemanal(usuario);
                                                    if (!progresso) return null;
                                                    let textoProgresso = 'Progresso indisponível';
                                                    if (!progresso.indisponivel) {
                                                        textoProgresso = `${progresso.concluidas}/${progresso.total} semanas concluídas`;
                                                    }
                                                    return <span className={styles.tarjaProgresso}>{textoProgresso}</span>;
                                                })()}
                                            </td>
                                            <td data-label="Email do usuário">{usuario.email}</td>
                                            <td data-label="Cronograma associado">{renderNomeCronograma(usuario.cronogramaAssociado)}</td>
                                            <td data-label="Validade de acesso">{formatarData(usuario.validade)}</td>
                                            <td data-label="Ações">
                                                <button className={styles.botao} onClick={() => {
                                                    if (user.role != "administrador" && user.role != "distribuidor") return toast.error("Baterista não pode editar usuários");
                                                    setAbertoEditar(true);
                                                    setIdUsuarioEditar(usuario._id);
                                                }}>Editar</button>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                            {usuariosFiltrados.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={usuariosFiltrados.length}
                                />
                            )}
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}
