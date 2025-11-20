import axios from "axios"
import type {AxiosRequestConfig} from "axios";

const instance = axios.create({
    baseURL:import.meta.env.VITE_API_HOST,
    headers:{
        Authorization:`Bearer ${import.meta.env.VITE_ADMIN_API_KEY}`
    },
    withCredentials:true,
})

export async function fetcher<T>(path: string, initRequestInit?:AxiosRequestConfig ){
    return instance({
        url:path,
        ...initRequestInit
    }).then((res)=>res.data as T)
}