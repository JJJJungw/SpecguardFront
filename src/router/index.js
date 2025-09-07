import { createRouter, createWebHistory } from "vue-router";
import Signup from "@/views/Signup.vue";
import Login from "@/views/Login.vue";
import Dashboard from "@/views/Dashboard.vue";
import Home from "@/views/Home.vue";
import InviteSignup from "@/views/InviteSignup.vue";
import InviteChoice from "@/views/InviteChoice.vue";
import Oauth2RedirectView from "@/views/Oauth2RedirectView.vue"; // ✅ 성공 콜백
import OAuth2Failure from "@/views/OAuth2Failure.vue"; // ✅ 실패 콜백

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
        props: route => ({ token: route.query.token }) // ✅ 토큰 props 전달
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
    {
        path: "/oauth2/failure",    // ✅ 소셜 로그인 실패 전용 페이지
        name: "Oauth2Failure",
        component: OAuth2Failure,
        props: route => ({
            code: route.query.code,
            message: route.query.message,
            token: route.query.token
        }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
