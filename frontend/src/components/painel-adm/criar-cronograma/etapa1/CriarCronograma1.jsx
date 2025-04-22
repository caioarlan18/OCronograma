import { useState, useEffect } from "react";
import { MenuLateral } from "../../menu-lateral/MenuLateral";
import styles from './CriarCronograma1.module.css';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { CriarPastaPopup } from "../../gerenciar-cronogramas/criar-pasta/CriarPastaPopup";
import { useNavigate } from "react-router-dom";
export function CriarCronograma1() {
    const [nome, setNome] = useState("");
    const [semanas, setSemanas] = useState(4);
    const [pastas, setPastas] = useState([]);
    const [pastaSelecionada, setPastaSelecionada] = useState(null);
    const [abrir, setAbrir] = useState(false);
    const id = localStorage.getItem("id") || sessionStorage.getItem("id");
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const increment = () => setSemanas((v) => v + 1);
    const decrement = () => setSemanas((v) => v > 0 ? v - 1 : 0);
    //pegar informação da pasta
    useEffect(() => {
        async function getPastas() {
            try {
                const response = await api.get("/pasta/read");
                const pastaOptions = response.data.map(pasta => ({
                    value: pasta._id,
                    label: pasta.nome
                }));
                setPastas(pastaOptions.reverse());
            } catch (error) {
                toast.error(error.response?.data || "Erro ao carregar pastas");
            }
        }
        getPastas();
    }, [abrir]);
    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get(`/user/read/${id}`);
                setUser(response.data);
            } catch (error) {
                toast.error(error.response.data.msg);

            }
        }
        getUser();
    }, [id])
    async function criarCronograma() {
        try {
            const response = await api.post("/cronograma", {
                nome: nome,
                userCriador: user.nome,
                pastaId: pastaSelecionada.value,
                quantidadeSemanas: semanas,
            })
            toast.success(response.data.msg);
            navigate(`/criar-cronograma2/${response.data.cronograma._id}`)
        } catch (error) {
            toast.error(error.response.data.msg, error.response.data.error)
        }
    }
    //estilização do reac-select
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

        option: (provided, state) => ({
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
        <div className={styles.cronograma1}>
            <MenuLateral ativo={2} />
            <CriarPastaPopup abrir={abrir} fechar={() => setAbrir(false)} finish={true} />
            <div className={styles.cronograma2}>
                <div className={styles.maintxt}>
                    <h1>Criando Cronograma</h1>
                    <p>Preencha todas as etapas até o fim.</p>
                </div>
                <div className={styles.campo1}>
                    <label htmlFor="">Nome do Cronograma</label>
                    <input
                        type="text"
                        placeholder='[NOME DO CRONOGRAMA]'
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                </div>
                <div className={styles.campo2}>
                    <label htmlFor="">Quantidade de semanas</label>
                    <div className={styles.campo2b}>
                        <button type="button" onClick={decrement}>-</button>
                        <input
                            type="number"
                            value={semanas}
                            onChange={(e) => setSemanas(Number(e.target.value))}
                        />
                        <button type="button" onClick={increment}>+</button>
                    </div>
                </div>
                <div className={styles.campo3}>
                    <label htmlFor="">Selecionar Pasta <span>ou</span> <button onClick={() => setAbrir(true)}>Criar pasta</button></label>
                    <Select
                        options={pastas}
                        value={pastaSelecionada}
                        onChange={setPastaSelecionada}
                        placeholder="Escolher pasta"
                        className={styles.select}
                        classNamePrefix="meu-select"
                        styles={customStyles}
                        isSearchable
                    />
                </div>

                <div className={styles.criar}>
                    <button type="button" onClick={criarCronograma}>Criar</button>
                </div>
            </div>
        </div>
    )
}