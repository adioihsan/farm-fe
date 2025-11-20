import type {  ILoginReqBody, IRegisterReqBody, IRegisterResBody } from "@/interfaces/auth.interface";
import type { IBaseResponse } from "@/interfaces/base.interface";
import { fetcher } from "@/lib/fetcher";

export async function RegisterApi(data:IRegisterReqBody):Promise<IRegisterResBody>{
    const response = await fetcher<IRegisterResBody>("/v1/auth/register",{method:"POST",data})
    return response
}

export async function LoginApi(data:ILoginReqBody):Promise<IBaseResponse> {
    const response = await fetcher<IBaseResponse>("/v1/auth/login",{method:"POST",data})
    return response
}