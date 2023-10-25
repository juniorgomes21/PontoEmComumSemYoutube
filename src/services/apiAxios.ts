import * as dotenv from "dotenv"
import axios from "axios";

// dotenv.config({ path: __dirname+'/.env' });
// const lol = `http://{process.env.IP_HOST}:{process.env.PORT || 8080} || localhost:{process.env.PORT || 8080}/api/info`;

const api = axios.create({
    baseURL: `http://localhost:8586`,  //`https://referenciasemcomum.com:8443/api/info`, // mudar o endereço
    data: {},
    headers: {}
})

export default api;

// o arquivo .env na raiz do projeto e não deve ir pro git

// # É possivel comentar
// IP_HOST=181.215.134.121
// PORT=8080
// dotenv.config({ path: __dirname+'/.env' });