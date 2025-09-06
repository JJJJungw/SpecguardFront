import { createRouter, createWebHistory } from "vue-router";
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Home from "@/views/Home.vue";
import InviteSignup from "@/views/InviteSignup.vue";
import InviteChoice from "@/views/InviteChoice.vue";
import Oauth2RedirectView from "@/views/Oauth2RedirectView.vue"; // ✅ 추가

const routes = [
    { path: "/", name: "Home", component: Home },
    { path: "/signup", name: "Signup", component: Signup },
    { path: "/login", name: "Login", component: Login },
    {
        path: "/:slug/dashboard",   // ✅ 동적 라우트
        name: "Dashboard",
        component: Dashboard,
        props: true,
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
        props: route => ({ token: route.query.token }),
    },
    {
        path: "/oauth2/redirect",   // ✅ 소셜 로그인 성공 후 리다이렉트 페이지
        name: "Oauth2Redirect",
        component: Oauth2RedirectView,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
