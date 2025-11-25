import axios from "axios";
import baseurl from "../baseurl/Baseurl";

const api = axios.create({
    baseURL: baseurl,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");

        if (token) {
            config.headers["x-access-token"] = token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            alert("Acesso negado. Faça login novamente.");
            localStorage.removeItem("token");
            sessionStorage.removeItem("token");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);
export default api;
