import { defineStore } from "pinia";
import { GetDashboardApi } from "@/api/dashboard.api";
import type {
    IDashboardData,
    IDashboardRange,
} from "@/interfaces/dashboard.interface";

interface IDashboardState {
    data: IDashboardData | null;
    range: IDashboardRange;
    isLoading: boolean;
    error: string | null;
}

export const useDashboardStore = defineStore("dashboard_store", {
    state: (): IDashboardState => ({
        data: null,
        range: "30d",
        isLoading: false,
        error: null,
    }),

    getters: {
        indicators(state) {
            return state.data?.indicators;
        },
        chart(state) {
            return state.data?.chart ?? [];
        },
    },

    actions: {
        async fetchDashboard(range?: IDashboardRange) {
            if (range) {
                this.range = range;
            }

            this.isLoading = true;
            this.error = null;

            try {
                const res = await GetDashboardApi(this.range);
                this.data = res.data;
            } catch (err: any) {
                console.error("fetchDashboard error:", err);
                this.error = err?.message || "Failed to fetch dashboard data";
                this.data = null;
            } finally {
                this.isLoading = false;
            }
        },
    },
});
