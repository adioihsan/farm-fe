import { createRouter, createWebHistory } from "vue-router"

import DashboardPage from "../pages/dashboard/DashboardPage.vue"
import LoginPage from "../pages/auth/LoginPage.vue"

const routes = [
    {
        path: "/", name: 'Dashboard', component: DashboardPage
    },
    {
        path: "/auth/login", name: "Login", component: LoginPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router