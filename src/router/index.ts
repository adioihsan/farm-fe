import { createRouter, createWebHistory } from "vue-router"

import DashboardPage from "@/pages/dashboard/DashboardPage.vue"
import LoginPage from "@/pages/auth/LoginPage.vue"
import RegisterPage from "@/pages/auth/RegisterPage.vue"

const routes = [
    {
        path: "/",
        name: 'Dashboard',
        component: DashboardPage,
        meta: { protected: true },
    },
    {
        path: "/auth/login",
        name: "Login",
        component: LoginPage,
        meta: { guest: true }
    },
    {
        path: "/auth/register",
        name: "Register",
        component: RegisterPage,
        meta: { guest: true }
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router