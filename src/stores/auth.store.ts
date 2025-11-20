import { LoginApi, RegisterApi } from "@/api/auth.api";
import type { ILoginReqBody, IRegisterReqBody } from "@/interfaces/auth.interface";
import type { LoginForm, RegisterForm } from "@/schema/auth.schema";
import { defineStore } from "pinia";

interface IState {
    token: string | undefined
}

export const useAuthStore = defineStore('auth_store', {
    state: (): IState => ({
        token: undefined
    }),
    actions: {
        register: async (data: RegisterForm) => {
            const res = await RegisterApi(data as IRegisterReqBody)
            return res.data
        },
        login: async (data: LoginForm) => {
            const res = await LoginApi(data as ILoginReqBody)
            return res.data
        }
    }
})