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

export default api;
