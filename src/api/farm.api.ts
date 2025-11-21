import type {
    ICreateFarmReqBody,
    ICreateFarmResBody,
    IUpdateFarmReqBody,
    IUpdateFarmResBody,
    IListFarmResBody,
    IGetFarmDetailResBody,
    IDeleteFarmResBody
} from "@/interfaces/farm.interface";

import { fetcher } from "@/lib/fetcher";

export async function CreateFarmApi(data: ICreateFarmReqBody): Promise<ICreateFarmResBody> {
    const response = await fetcher<ICreateFarmResBody>("/v1/farm", {
        method: "POST",
        data,
    });
    return response;
}

export async function ListFarmApi(): Promise<IListFarmResBody> {
    const response = await fetcher<IListFarmResBody>("/v1/farm", {
        method: "GET",
    });
    return response;
}

export async function GetFarmDetailApi(
    farmId: string
): Promise<IGetFarmDetailResBody> {
    const response = await fetcher<IGetFarmDetailResBody>(`/v1/farm/${farmId}`, {
        method: "GET",
    });
    return response;
}

export async function UpdateFarmApi(
    farmId: string,
    data: IUpdateFarmReqBody
): Promise<IUpdateFarmResBody> {
    const response = await fetcher<IUpdateFarmResBody>(`/v1/farm/${farmId}`, {
        method: "PUT",
        data,
    });
    return response;
}

export async function DeleteFarmApi(
    farmId: string
): Promise<IDeleteFarmResBody> {
    const response = await fetcher<IDeleteFarmResBody>(`/v1/farm/${farmId}`, {
        method: "DELETE",
    });
    return response;
}
