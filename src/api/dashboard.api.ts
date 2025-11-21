import { fetcher } from "@/lib/fetcher";
import type {
    IDashboardRange,
    IDashboardResBody,
} from "@/interfaces/dashboard.interface";

/**
 * Get dashboard indicators + chart
 * @param range "7d" | "30d" | "90d" (default "30d" di BE)
 */
export async function GetDashboardApi(range?: IDashboardRange): Promise<IDashboardResBody> {
    const response = await fetcher<IDashboardResBody>("/v1/dashboard", {
        method: "GET", params: range ? { range } : undefined,
    });

    return response;
}
