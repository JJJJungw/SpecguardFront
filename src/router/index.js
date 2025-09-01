import { createRouter, createWebHistory } from "vue-router";

import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";

const routes = [
    { path: "/signup", component: Signup },
    { path: "/login", component: Login },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
