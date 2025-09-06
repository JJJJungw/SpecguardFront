import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import refreshApi from "@/api/refresh";

const api = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    withCredentials: true, // ✅ Refresh 쿠키 전송 허용
});

// ✅ 요청 인터셉터: AccessToken 자동 추가
api.interceptors.request.use((config) => {
    const authStore = useAuthStore();

    // /auth/token 호출에는 Authorization 헤더 붙이지 않음
    if (!config.url.includes("/auth/token")) {
        const token = authStore.accessToken || localStorage.getItem("accessToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
    }

    return config;
});

// ✅ 응답 인터셉터: 401 → Refresh 로직
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const authStore = useAuthStore();
        const originalRequest = error.config;

        // /auth/token 요청에서는 refresh 로직을 태우지 않음
        if (originalRequest.url.includes("/auth/token")) {
            return Promise.reject(error);
        }

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
