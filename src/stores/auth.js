import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        accessToken: null,
        user: null,
    }),
    actions: {
        async signup(payload) {
            await axios.post("/api/v1/auth/signup", payload);
        },
        async login(email, password) {
            const res = await axios.post("/api/v1/auth/login", { email, password }, { withCredentials: true });
            this.accessToken = res.data.accessToken;
            this.user = res.data.user;
        },
    },
});
