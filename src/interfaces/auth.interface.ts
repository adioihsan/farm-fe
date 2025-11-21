import type { IBaseResponse } from './base.interface';


export interface ILoginReqBody {
    email: string;
    password:string;
}

export interface ILoginReqBody {
    email: string;
    password:string;
}
export interface ILoginResBody extends IBaseResponse{
    data:{
    accessToken:string;
    refreshToken?:string // optional if FE and BE not in the same region. but for this test case it belongs to the same regions
    }
}


export interface IRegisterReqBody {
    name:string;
    email: string;
    password:string;
    confirmPassword:string;
}

export interface IMe{
    id:string,
    email:string,
    name:string,
}

export interface IMeResBody extends IBaseResponse{
    data:IMe
}

export interface IRegisterResBody extends IBaseResponse{
    data:{
        email:string
    };
}





