import { useNavigate, useParams } from "react-router-dom"
import { MenuLateral } from "../../menu-lateral/MenuLateral";
import styles from './GerenciarCronogramas.module.css';
import api from './../../../../axiosConfig/axios';
import { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import pastaAberta from '../../../../images/iconepastaaberta.svg';
import { EditarPastaPopup } from "../editar-pasta/EditarPastaPopup";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MoverCronogramaPopup } from "../mover/MoverCronogramaPopup";
import Swal from 'sweetalert2';

export function GerenciarCronogramas() {
    const navigate = useNavigate();
    const params = useParams();
    const [pasta, setPasta] = useState([]);
    const [busca, setBusca] = useState("");
    const [abrir, setAbrir] = useState(false);
    const [abrirMover, setAbrirMover] = useState(false);
    const [idCro, setIdCro] = useState("");
    const [cronogramas, setCronogramas] = useState([]);
    const [trigger, setTrigger] = useState(false);
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState([]);
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
    }, [id])
    useEffect(() => {
        async function getPasta() {
            try {
                const response = await api.get(`/pasta/read/${params.idPasta}`);
                setPasta(response.data);
            } catch (error) {
                toast.error(error.response.data.msg)

            }
        }
        getPasta();
    }, [params.idPasta, abrir]);

    useEffect(() => {
        async function renderCronogramas() {
            try {
                const response = await api.get(`/cronograma/renderizar/${params.idPasta}`)
                setCronogramas(response.data.reverse());
            } catch (error) {
                toast.error(error.response.data.msg)

            }
        }
        renderCronogramas()
    }, [params.idPasta, trigger, abrirMover])

    function formatarData(dataISO) {
        const data = new Date(dataISO);
        const dia = String(data.getUTCDate()).padStart(2, '0');
        const mes = String(data.getUTCMonth() + 1).padStart(2, '0');
        const ano = data.getUTCFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    const cronogramasFiltrados = cronogramas.filter(cronograma =>
        cronograma.nome.toLowerCase().includes(busca.toLowerCase())
    );
    async function duplicar(id) {
        if (user.role != "administrador" && user.role != "distribuidor") return toast.error("Baterista não pode duplicar cronogramas");

        try {
            const response = await api.post(`/cronograma/clonar/${id}`);
            toast.success(response.data.msg);
            setTrigger(prev => !prev);
        } catch (error) {
            toast.error(error.response.data.msg)

        }
    }
    async function excluir(id) {
        try {
            if (user.role !== "administrador") return toast.error("Somente o administrador pode deletar um cronograma");


            const resultado = await Swal.fire({
                title: 'Tem certeza?',
                text: 'Essa ação irá excluir o cronograma permanentemente.',
                icon: 'warning',
                iconColor: '#E30613',
                showCancelButton: true,
                confirmButtonColor: '#E30613',
                cancelButtonColor: '#4D02E0',
                confirmButtonText: 'Sim, excluir',
                cancelButtonText: 'Cancelar',
                didOpen: () => {
                    const popup = document.querySelector('.swal2-popup');
                    popup.style.fontFamily = 'Poppins, sans-serif';
                }
            });
            if (resultado.isConfirmed) {
                const response = await api.delete(`/cronograma/delete/${id}`);
                toast.success(response.data.msg);
                setTrigger(prev => !prev);
            }

        } catch (error) {
            toast.error(error.response.data.msg)

        }
    }

    async function mover() {
        if (user.role != "administrador" && user.role != "distribuidor") return toast.error("Baterista não pode mover cronogramas");

        setAbrirMover(true);
    }
    return (
        <div className={styles.gcro}>
            <MenuLateral ativo={3} />
            <EditarPastaPopup abrir={abrir} fechar={() => setAbrir(false)} pastaId={pasta._id} />
            <MoverCronogramaPopup abrir={abrirMover} fechar={() => setAbrirMover(false)} idCro={idCro} />
            <div className={styles.gcro1}>
                <div className={styles.gcro2}>
                    <input type="text" placeholder='Pesquise o cronograma...' value={busca} onChange={(e) => setBusca(e.target.value)} />
                    <button onClick={() => setAbrir(true)}>Editar pasta</button>

                </div>
                <div className={styles.gcro3}>
                    <div className={styles.cardpastas} >
                        <img src={pastaAberta} alt="icone-de-pasta" />
                        <h1>{pasta.nome}</h1>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.header}>
                            <h1>Cronogramas ({cronogramasFiltrados.length})</h1>
                        </div>

                        <table className={styles.tabela}>
                            <thead>
                                <tr>
                                    <th>Nome do Cronograma</th>
                                    <th>Administrador</th>
                                    <th>Última atualização</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {cronogramasFiltrados.map((cronograma, index) => (
                                    <tr key={index} className={index % 2 === 0 ? styles.par : styles.impar}>
                                        <td data-label="Nome do cronograma">{cronograma.nome}</td>
                                        <td data-label="usuario criador">{cronograma.userCriador}</td>
                                        <td data-label="Data de atualização">{formatarData(cronograma.updatedAt)}</td>
                                        <td data-label="Ações">
                                            <DropdownMenu.Root>
                                                <DropdownMenu.Trigger asChild>
                                                    <button className={styles.botao}>Opções</button>
                                                </DropdownMenu.Trigger>

                                                <DropdownMenu.Portal>
                                                    <DropdownMenu.Content className={styles.menuSuspenso} sideOffset={5}>
                                                        <DropdownMenu.Item className={`${styles.opcao} ${styles.editar}`} onClick={() => navigate(`/criar-cronograma2/${cronograma._id}`)}>Editar</DropdownMenu.Item>
                                                        <DropdownMenu.Item className={styles.opcao} onClick={() => duplicar(cronograma._id)}>Duplicar</DropdownMenu.Item>
                                                        <DropdownMenu.Item className={styles.opcao} onClick={() => {
                                                            mover()
                                                            setIdCro(cronograma._id)
                                                        }}>Mover</DropdownMenu.Item>
                                                        <DropdownMenu.Item className={`${styles.opcao} ${styles.excluir}`} onClick={() => excluir(cronograma._id)}>Excluir</DropdownMenu.Item>
                                                    </DropdownMenu.Content>
                                                </DropdownMenu.Portal>
                                            </DropdownMenu.Root>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

        </div>
    )
}