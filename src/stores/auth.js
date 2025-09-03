import { defineStore } from "pinia";
import api from "@/api/axios";
import refreshApi from "@/api/refresh"; // 🔹 추가
import { login as loginApi } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: localStorage.getItem("accessToken") || null,
        user: JSON.parse(localStorage.getItem("user") || "null"),
        companySlug: localStorage.getItem("companySlug") || null,
    }),
    actions: {
        // 로그인
        async login(email, password) {
            const res = await loginApi(email, password);
            this.accessToken = res.headers["authorization"]?.replace("Bearer ", "");
            localStorage.setItem("accessToken", this.accessToken);

            const payload = jwtDecode(this.accessToken);
            this.companySlug = payload.companySlug;
            localStorage.setItem("companySlug", this.companySlug);

            const userRes = await api.get(`company/${this.companySlug}/users/me`, {
                headers: { Authorization: `Bearer ${this.accessToken}` },
            });
            this.user = userRes.data;
            localStorage.setItem("user", JSON.stringify(this.user));
        },

        // ✅ refreshToken
        async refreshToken() {
            try {
                const res = await refreshApi.post("/auth/token/refresh"); // 🔹 refreshApi 사용
                const newAccessToken =
                    res.headers["authorization"]?.replace("Bearer ", "");

                if (!newAccessToken) {
                    throw new Error("새로운 액세스 토큰을 받지 못했습니다.");
                }

                // 저장
                this.accessToken = newAccessToken;
                localStorage.setItem("accessToken", newAccessToken);

                const payload = jwtDecode(newAccessToken);
                this.companySlug = payload.companySlug;
                localStorage.setItem("companySlug", this.companySlug);

                return newAccessToken;
            } catch (err) {
                this.logout();
                throw err;
            }
        },

        // 로그아웃
        async logout() {
            this.accessToken = null;
            this.user = null;
            this.companySlug = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            localStorage.removeItem("companySlug");
        },
    },
});
