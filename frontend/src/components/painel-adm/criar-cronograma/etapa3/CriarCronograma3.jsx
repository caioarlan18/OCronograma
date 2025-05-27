import { useParams } from "react-router-dom";
import { MenuLateral } from "../../menu-lateral/MenuLateral";
import styles from './CriarCronograma3.module.css';
import { useEffect, useState } from "react";
import api from '../../../../axiosConfig/axios';
import toast from "react-hot-toast";
import Select from 'react-select';
import { CriarUsuarioPopup } from "../../gerenciar-usuarios/criar-usuario/CriarUsuarioPopup";

export function CriarCronograma3() {
    const params = useParams();
    const [cronograma, setCronograma] = useState([]);
    const [usuariosSelecionados, setUsuariosSelecionados] = useState([]);
    const [abrir, setAbrir] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [idsUsuariosAssociados, setIdsUsuariosAssociados] = useState([]);
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
        async function getCronograma() {
            try {
                const response = await api.get(`/cronograma/read/${params.idCronograma}`);
                setCronograma(response.data);
                setIdsUsuariosAssociados(response.data.usuariosAssociados);
            } catch (error) {
                toast.error(error.response?.data?.msg || 'Erro ao carregar cronograma');
            }
        }
        getCronograma();
    }, [params.idCronograma]);

    useEffect(() => {
        async function loadUsers() {
            try {
                const response = await api.get("/user/read");

                const apenasAlunos = response.data.filter(usuario => usuario.role === 'aluno');

                const usuariosOptions = apenasAlunos.map(usuario => ({
                    value: usuario._id,
                    label: usuario.nome
                })).reverse();

                setUsuarios(usuariosOptions);

                const selecionados = usuariosOptions.filter(u =>
                    idsUsuariosAssociados.includes(u.value)
                );
                setUsuariosSelecionados(selecionados);
            } catch (error) {
                toast.error(error.response?.data?.msg || 'Erro ao carregar usuários');
            }
        }
        loadUsers();
    }, [abrir, idsUsuariosAssociados]);


    async function associarUsuarios(e) {
        e.preventDefault();
        if (user.role != "administrador" && user.role != "distribuidor") return toast.error("Baterista não pode associar usuários");

        try {
            const ids = usuariosSelecionados.map(user => user.value);

            const associar = await api.patch(`/cronograma/${params.idCronograma}/associar-usuarios`, {
                idUsuarios: ids
            });

            toast.success(associar.data.msg);


        } catch (error) {
            toast.error(error.response?.data?.msg || 'Erro ao atualizar usuários');
        }
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            backgroundColor: '#fff',
            borderColor: '#DADADA',
            borderRadius: '8px',
            boxShadow: 'none',
            padding: '2px 6px',
            minHeight: '48px',
            fontSize: '14px',
            fontFamily: 'Poppins, sans-serif',
            '&:hover': {
                borderColor: '#DADADA',
            },
            cursor: "pointer"
        }),
        menu: (provided) => ({
            ...provided,
            backgroundColor: '#fff',
            borderRadius: '8px',
            marginTop: 4,
            boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            border: '0.5px solid #DADADA',
        }),
        menuList: (provided) => ({
            ...provided,
            padding: 0,
        }),
        option: (provided) => ({
            ...provided,
            backgroundColor: '#fff',
            color: '#939393',
            borderBottom: '0.5px solid #F6F6F6',
            padding: '12px 16px',
            cursor: 'pointer',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: "500",
            ':hover': {
                backgroundColor: '#fff',
            },
            ':active': {
                backgroundColor: '#fff',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: '#939393',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
            fontWeight: "500"
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#C6C6C6',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '14px',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#999',
            padding: 4,
        }),
        indicatorSeparator: () => ({
            display: 'none',
        }),
    };

    return (
        <div className={styles.cronograma3}>
            <MenuLateral ativo={2} />
            <CriarUsuarioPopup abrir={abrir} fechar={() => setAbrir(false)} />
            <div className={styles.cronograma3a}>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>{cronograma?.nome}</h1>
                    <p className={styles.subtitle}>
                        Esse Cronograma é para ser <br /> utilizado por quais usuários?
                    </p>
                </div>
                <div className={styles.cronograma3b}>
                    <div className={styles.header}>
                        <h1>Atribuir e/ou Criar Usuário</h1>
                        <p>Esse Cronograma será utilizado por quem?</p>
                    </div>

                    <form className={styles.form}>
                        <div className={styles.row}>
                            <div className={styles.campo3}>
                                <label htmlFor="">
                                    Selecione o usuário<span>ou</span>
                                    <button onClick={(e) => { e.preventDefault(); setAbrir(true); }}>Criar Usuário</button>
                                </label>
                                <Select
                                    options={usuarios}
                                    value={usuariosSelecionados}
                                    onChange={(selectedOptions, actionMeta) => {
                                        if (user.role != "administrador" && user.role != "distribuidor") return toast.error("Baterista não pode desassociar usuários");

                                        if (actionMeta.action === "remove-value" || actionMeta.action === "pop-value") {
                                            const confirmacao = window.confirm("Deseja realmente remover este usuário?");
                                            if (!confirmacao) return;

                                            setUsuariosSelecionados(selectedOptions);
                                        } else {
                                            setUsuariosSelecionados(selectedOptions);
                                        }
                                    }}
                                    placeholder="Escolher usuários"
                                    className={styles.select}
                                    classNamePrefix="meu-select"
                                    styles={customStyles}
                                    isSearchable
                                    isMulti
                                />
                            </div>
                        </div>

                        <button className={styles.submitButton} onClick={associarUsuarios}>
                            Atribuir Usuário a este Cronograma
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
