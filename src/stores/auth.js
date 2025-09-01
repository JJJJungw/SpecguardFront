import { defineStore } from "pinia";
import { signup, login } from "@/api/auth";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: null,
        user: null,
    }),
    actions: {
        async signup(payload) {
            await signup(payload);
        },
        async login(email, password) {
            const res = await login(email, password);
            this.accessToken = res.data.accessToken;
            this.user = res.data.user;
        },
    },
});
