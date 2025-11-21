import type {  ILoginReqBody, ILoginResBody, IMeResBody, IRegisterReqBody, IRegisterResBody } from "@/interfaces/auth.interface";
import type { IBaseResponse } from "@/interfaces/base.interface";
import { fetcher,cleanFetcher } from "@/lib/fetcher";

export async function RegisterApi(data:IRegisterReqBody):Promise<IRegisterResBody>{
    const response = await cleanFetcher<IRegisterResBody>("/v1/auth/register",{method:"POST",data})
    return response
}

export async function LoginApi(data:ILoginReqBody):Promise<ILoginResBody> {
    const response = await cleanFetcher<ILoginResBody>("/v1/auth/login",{method:"POST",data})
    return response
}

export async function LogoutApi():Promise<IBaseResponse>{
    const response = await cleanFetcher<IBaseResponse>("/v1/auth/logout",{method:"GET"})
    return response
}

export async function MeApi():Promise<IMeResBody>{
    const response = await fetcher<IMeResBody>("/v1/auth/me",{method:"GET"})
    return response
}