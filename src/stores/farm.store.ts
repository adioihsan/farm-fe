import { defineStore } from "pinia";
import {
    CreateFarmApi,
    ListFarmApi,
    GetFarmDetailApi,
    UpdateFarmApi,
    DeleteFarmApi,
} from "@/api/farm.api";

import type { ICreateFarmReqBody, IFarm, IUpdateFarmReqBody } from "@/interfaces/farm.interface";
import type {
    CreateFarmForm,
    UpdateFarmForm,
} from "@/schema/farm.schema";

interface IFarmState {
    farms: IFarm[];
    selectedFarm: IFarm | null;
    isLoading: boolean;
}

export const useFarmStore = defineStore("farm_store", {
    state: (): IFarmState => ({
        farms: [],
        selectedFarm: null,
        isLoading: false,
    }),

    getters: {
        hasFarms: (state) => state.farms.length > 0,
        getFarmById: (state) => (id: string) =>
            state.farms.find((f) => f.id === id) || null,
    },

    actions: {
        // async init() {
        //     if (this.initialized) return;
        //     await this.fetchFarms();
        //     this.initialized = true;
        // },

        async fetchFarms() {
            try {
                this.isLoading = true;
                const res = await ListFarmApi();
                this.farms = res.data || [];
            } catch (error) {
                this.farms = [];
            } finally {
                this.isLoading = false;
            }
        },

        async fetchFarmDetail(farmId: string) {
            try {
                this.isLoading = true;
                const res = await GetFarmDetailApi(farmId);
                const farm = res.data;

                this.selectedFarm = farm;

                const idx = this.farms.findIndex((f) => f.id === farm.id);
                if (idx !== -1) {
                    this.farms[idx] = farm;
                } else {
                    this.farms.push(farm);
                }

                return farm;
            } finally {
                this.isLoading = false;
            }
        },

        async createFarm(form: CreateFarmForm) {
            try {
                this.isLoading = true;

                const payload: ICreateFarmReqBody = {
                    farmName: form.farmName,
                    ownerName: form.ownerName,
                    location: form.location,
                    isPartner: form.isPartner === "yes",
                };

                console.log("form",form)

                const res = await CreateFarmApi(payload);
                const farm = res.data;

                if (farm) {
                    this.farms.unshift(farm);
                }

                return farm;
            } finally {
                this.isLoading = false;
            }
        },

        async updateFarm(farmId: string, form: UpdateFarmForm) {
            try {
                this.isLoading = true;

                const payload: IUpdateFarmReqBody = {
                    farmName: form.farmName,
                    ownerName: form.ownerName,
                    location: form.location,
                };

                if (form.isPartner !== undefined) {
                    payload.isPartner = form.isPartner === "yes"; 
                }

                const res = await UpdateFarmApi(farmId, payload);
                const updated = res.data;

                const idx = this.farms.findIndex((f) => f.id === farmId);
                if (idx !== -1 && updated) {
                    this.farms[idx] = updated;
                }

                if (this.selectedFarm && this.selectedFarm.id === farmId) {
                    this.selectedFarm = updated;
                }

                return updated;
            } finally {
                this.isLoading = false;
            }
        },

        async deleteFarm(farmId: string) {
            try {
                this.isLoading = true;
                await DeleteFarmApi(farmId);

                this.farms = this.farms.filter((f) => f.id !== farmId);

                if (this.selectedFarm && this.selectedFarm.id === farmId) {
                    this.selectedFarm = null;
                }
            } finally {
                this.isLoading = false;
            }
        },
    },
});
