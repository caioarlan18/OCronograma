import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import api from '../../axiosConfig/axios';
import toast from 'react-hot-toast';

export function VerifyToken({ children }) {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        async function verifyToken() {
            const id = localStorage.getItem("id") || sessionStorage.getItem("id");
            const token = localStorage.getItem("token") || sessionStorage.getItem("token");
            if (!id || !token) {
                navigate("/");
            } else {
                try {
                    await api.get(`/user/logged/${id}`, {
                        headers: {
                            'x-access-token': token
                        }
                    });

                    setIsAuth(true);

                } catch (error) {
                    toast.error("Acesso negado ", error);
                    navigate("/");
                }
            }
        }
        verifyToken();
    }, [])
    return isAuth ? children : null

}