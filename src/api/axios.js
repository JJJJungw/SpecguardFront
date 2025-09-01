// src/api/axios.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080", // 개발용
    withCredentials: true,            // ✅ 쿠키 전송 허용
});

export default api;
