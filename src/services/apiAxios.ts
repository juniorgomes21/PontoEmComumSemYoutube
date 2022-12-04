import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api/info", // mudar o endereço
    data: {},
    headers: {}
})

export default api;