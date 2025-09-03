import { createRouter, createWebHistory } from "vue-router";
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Home from "@/views/Home.vue";
import InviteSignup from "@/views/InviteSignup.vue";
import InviteChoice from "@/views/InviteChoice.vue";

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/signup", name: "Signup", component: Signup },
    { path: "/login", name: "Login", component: Login },
    {
        path: "/:slug/dashboard",   // ✅ 동적 라우트
        name: "Dashboard",
        component: Dashboard,
        props: true,                // ✅ slug를 컴포넌트 props로 전달
    },
    {
        path: "/signup/invite",
        name: "InviteChoice",
        component: InviteChoice,
    },
    {
        path: "/signup/invite/form",
        name: "InviteSignup",
        component: InviteSignup,
        props: route => ({ token: route.query.token }) // ✅ token 전달
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
