import { createRouter, createWebHistory } from "vue-router"

import DashboardPage from "@/pages/dashboard/DashboardPage.vue"
import LoginPage from "@/pages/auth/LoginPage.vue"
import RegisterPage from "@/pages/auth/RegisterPage.vue"
import { useAuthStore } from "@/stores/auth.store"

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

router.beforeEach(async (to) => {
    const useAuth = useAuthStore()
    if (!useAuth.initialized) {
        await useAuth.init()
    }

    const isLoggedIn = useAuth.isAuthenticated;

    if (to.meta.protected && !isLoggedIn) {
        return {
            name: "Login",
            query: { redirect: to.fullPath }
        }
    }

    if (to.meta.guest && isLoggedIn) {
        return {
            name: "Dashboard",
        }
    }

    return true
})

export default router