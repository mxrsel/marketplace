import axios from "axios";
import {apiURL} from "./globalConstants.ts";

const axiosApi = axios.create({
    baseURL: apiURL
});

export default axiosApi;