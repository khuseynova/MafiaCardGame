import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
    baseURL: `${process.env.VUE_APP_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${store.getters.getUserToken}`;
    return config;
});

export default axiosClient;