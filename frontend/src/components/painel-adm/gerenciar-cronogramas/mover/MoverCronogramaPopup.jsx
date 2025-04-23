import styles from './MoverCronogramaPopup.module.css';
import Modal from 'react-modal';
import closeicon from '../../../../images/closeicon.svg';
import api from '../../../../axiosConfig/axios';
import toast from 'react-hot-toast';
import Select from 'react-select';

import { useEffect, useState } from 'react';
Modal.setAppElement('#root');

export function MoverCronogramaPopup({ abrir, fechar, idCro }) {
    const [pastas, setPastas] = useState([]);
    const [pastaSelecionada, setPastaSelecionada] = useState(null);
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
    async function mover(e) {
        e.preventDefault();
        if (!pastaSelecionada) return toast.error("Selecione alguma pasta");
        try {
            if (!idCro) return;
            const response = await api.put(`/cronograma/mover/${idCro}/${pastaSelecionada.value}`);
            toast.success(response.data.msg);
            fechar();
        } catch (error) {
            toast.error(error.response.data.msg)

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
        <div className={styles.criarpasta}>

            <Modal
                isOpen={abrir}
                onRequestClose={fechar}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 1000,
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        transform: 'translate(-50%, -50%)',
                        padding: '30px',
                        borderRadius: '12px',
                        width: '500px',
                        maxWidth: '90%',
                        border: 'none',
                        background: '#fff',
                    },
                }}
            >
                <div className={styles.header}>
                    <h1>Mover Cronograma</h1>
                    <img src={closeicon} alt="fechar-popup" onClick={fechar} />
                </div>

                <form className={styles.form}>
                    <div className={styles.row}>
                        <div className={styles.campo3}>
                            <label htmlFor="">Selecionar Pasta</label>
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

                    </div>

                    <button className={styles.submitButton} onClick={mover} >Mover Cronograma</button>
                </form>
            </Modal>
        </div>
    );
}
