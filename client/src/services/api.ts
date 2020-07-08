import Axios from "axios"
import {Modal} from "antd";

const api = Axios.create({
    baseURL: 'http://localhost:8000'
})

export default api;
