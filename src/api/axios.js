import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import refreshApi from "@/api/refresh"; // 🔹 추가

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    let token = authStore.accessToken || localStorage.getItem("accessToken");

    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStore = useAuthStore();
        const originalRequest = error.config;

        if (error.response?.status === 401) {
            const errorCode = error.response.data?.code;

            if (errorCode === "ACCESS_TOKEN_EXPIRED" && !originalRequest._retry) {
                originalRequest._retry = true;
                try {
                    const refreshRes = await refreshApi.post("/auth/token/refresh");
                    const newAccessToken =
                        refreshRes.headers["authorization"]?.replace("Bearer ", "");
                    if (newAccessToken) {
                        authStore.accessToken = newAccessToken;
                        localStorage.setItem("accessToken", newAccessToken);

                        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                        return api(originalRequest); // 재시도
                    }
                } catch (err) {
                    authStore.logout();
                    return Promise.reject(err);
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
