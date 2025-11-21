import type { IBaseResponse } from "./base.interface";

export interface IFarm {
    id: string;
    userId:string;
    farmName: string;
    ownerName: string;
    location: string;
    isPartner:boolean;
    createdAt: string; 
    updatedAt: string;
}

export interface ICreateFarmReqBody {
    farmName: string;
    ownerName: string;
    location: string;
    isPartner: boolean;
}

export interface ICreateFarmResBody extends IBaseResponse {
    data: IFarm;
}

export interface IUpdateFarmReqBody {
    farmName?: string;
    ownerName?: string;
    location?: string;
    isPartner?: boolean;
}

export interface IUpdateFarmResBody extends IBaseResponse {
    data: IFarm;
}

export interface IListFarmResBody extends IBaseResponse {
    data: IFarm[];
}

export interface IGetFarmDetailResBody extends IBaseResponse {
    data: IFarm;
}

export interface IDeleteFarmResBody extends IBaseResponse {
    data: null;
}
