import type { IBaseResponse } from './base.interface';

export interface ILoginReqBody {
    email: string;
    password:string;
}

export interface ILoginReqBody {
    email: string;
    password:string;
}

export interface IRegisterReqBody {
    name:string;
    email: string;
    password:string;
    confirmPassword:string;
}

export interface IRegisterResBody extends IBaseResponse{
    data:{
        email:string
    };
}



