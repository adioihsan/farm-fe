import { LoginApi, LogoutApi, MeApi, RegisterApi } from "@/api/auth.api";
import type { ILoginReqBody, IRegisterReqBody, IMe } from "@/interfaces/auth.interface";
import { setAccessTokenApi } from "@/lib/fetcher";
import type { LoginForm, RegisterForm } from "@/schema/auth.schema";
import { defineStore } from "pinia";

interface IState {
    me: IMe | null
    initialized: boolean
    refreshPromise: Promise<string | null> | null
    isLoading: boolean
}

export const useAuthStore = defineStore('auth_store', {
    state: (): IState => ({
        me: null,
        initialized: false,
        refreshPromise: null,
        isLoading: false,
    }),
    getters: {
        isAuthenticated: (state) => !!state.me
    },
    actions: {
        async init() {
            if (this.initialized) return;
            try {
                this.isLoading = true
                const meRes = await MeApi()
                this.me = meRes.data
            } catch (error) {
                this.me = null;
                setAccessTokenApi(null);
                await this.logout()
            }
            finally {
                this.initialized = true
                this.isLoading = false;
            }
        },
        async register(data: RegisterForm) {
            try {
                this.isLoading = true
                const res = await RegisterApi(data as IRegisterReqBody)
                this.isLoading = false
                return res.data
            } finally {
                this.isLoading = false
            }

        },
        async login(data: LoginForm) {
            try {
                this.isLoading = true
                const res = await LoginApi(data as ILoginReqBody)
                const token = res.data.accessToken

                setAccessTokenApi(token)
                const meRes = await MeApi()

                this.me = meRes.data
                return res.data
            } finally {
                this.isLoading = false
            }

        },

        async logout() {
            this.isLoading = true
            try {
                this.me = null
                await LogoutApi()
                setAccessTokenApi(null)
                return true
            } finally {
                this.isLoading = false
            }

        }
    }
})