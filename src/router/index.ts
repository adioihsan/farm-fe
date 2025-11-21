import { createRouter, createWebHistory } from "vue-router"

import DashboardPage from "@/pages/dashboard/DashboardPage.vue"
import LoginPage from "@/pages/auth/LoginPage.vue"
import RegisterPage from "@/pages/auth/RegisterPage.vue"
import { useAuthStore } from "@/stores/auth.store"
import FarmPage from "@/pages/farm/FarmPage.vue"
import CreateFarmPage from "@/pages/farm/create/CreateFarmPage.vue"
import UpdateFarmPage from "@/pages/farm/update/UpdateFarmPage.vue"
import { useGlobalLoading } from "@/composables/useGlobalLoading"

const routes = [
    {
        path: "/auth/login",
        name: "Login",
        component: LoginPage,
        meta: { guest: true, layout: "auth", title: "Login" }
    },
    {
        path: "/auth/register",
        name: "Register",
        component: RegisterPage,
        meta: { guest: true, layout: "auth", title: "Register" }
    },
    {
        path: "/",
        name: 'Dashboard',
        component: DashboardPage,
        meta: { protected: true, layout: "dashboard", title: "Dashboard" },
    },
    {
        path: "/farm",
        name: 'Farm',
        component: FarmPage,
        meta: { protected: true, layout: "dashboard", title: "Farms" },
    },
    {
        path: "/farm/create",
        name: 'CreateFarm',
        component: CreateFarmPage,
        meta: { protected: true, layout: "dashboard", title: "Add New Farm" },
    },
        {
        path: "/farm/:id/update",
        name: 'UpdateFarm',
        component: UpdateFarmPage,
        meta: { protected: true, layout: "dashboard", title: "Update Farm" },
    }

]

const router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach(async (to) => {
    const useAuth = useAuthStore()
    const useLoading = useGlobalLoading()
    if (!useAuth.initialized) {
        useLoading.showLoading("Initialize")
        await useAuth.init()
        useLoading.hideLoading()
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
    // update document title
    const RouteTitle= to.meta.title as string
    document.title =` Japfa Farm | ${RouteTitle}`
    return true
})

export default router