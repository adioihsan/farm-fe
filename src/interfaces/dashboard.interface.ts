import type { IBaseResponse } from "@/interfaces/base.interface";

export type IDashboardRange = "7d" | "30d" | "90d";

export interface IDashboardIndicators {
    totalUsers: number;
    totalFarms: number;
    partnerFarms: number;
    nonPartnerFarms: number;
    activeSessions: number;
}

export interface IDashboardChartPoint {
    date: string;
    farmsCreated: number;
}

export interface IDashboardData {
    range: IDashboardRange;
    indicators: IDashboardIndicators;
    chart: IDashboardChartPoint[];
}

export interface IDashboardResBody extends IBaseResponse {
    data: IDashboardData;
}
