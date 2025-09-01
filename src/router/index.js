import { createRouter, createWebHistory } from "vue-router";
import Signup from "@/views/Signup.vue";

const routes = [
    { path: "/", redirect: "/signup" },   // ✅ 기본 경로를 회원가입으로
    { path: "/signup", name: "Signup", component: Signup }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
