import { defineStore } from "pinia";
import api from "@/api/axios";
import { login as loginApi } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: localStorage.getItem("accessToken") || null,
        user: JSON.parse(localStorage.getItem("user") || "null"),
        companySlug: localStorage.getItem("companySlug") || null, // ✅ slug 따로 보관
    }),
    actions: {
        async login(email, password) {
            // 1. 로그인 요청
            const res = await loginApi(email, password);
            this.accessToken = res.headers["authorization"]?.replace("Bearer ", "");
            localStorage.setItem("accessToken", this.accessToken);

            // 2. JWT 디코딩해서 slug 추출
            const payload = jwtDecode(this.accessToken);
            this.companySlug = payload.companySlug;
            localStorage.setItem("companySlug", this.companySlug);

            // 3. /me 호출
            const userRes = await api.get(`/api/v1/company/${this.companySlug}/users/me`, {
                headers: { Authorization: `Bearer ${this.accessToken}` },
            });

            this.user = userRes.data;
            localStorage.setItem("user", JSON.stringify(this.user));
        },

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
