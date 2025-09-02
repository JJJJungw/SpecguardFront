import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/signup", name: "Signup", component: Signup },
    { path: "/login", name: "Login", component: Login },
    { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router; // ✅ 이게 있어야 main.js에서 import router가 동작함
