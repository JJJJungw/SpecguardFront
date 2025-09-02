import api from "./axios";

export const signup = (payload) =>
    api.post("/api/v1/auth/signup/company", payload);

export const login = (email, password) =>
    api.post("/api/v1/auth/login", { email, password }); // ✅ 여기