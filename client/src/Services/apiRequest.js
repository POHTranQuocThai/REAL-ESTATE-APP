import axios from "axios";
import { env } from "../config/enviroment.js";

export const apiRequest = axios.create({
    baseURL: `http://localhost:8800/api`, // Thêm `${}` để đảm bảo chuỗi URL hợp lệ
    withCredentials: true
});
