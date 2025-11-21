<!-- <template>
  <div class="w-full">
    <FarmTable :columns="farmColumns" :data="farmStore.farms" />
  </div>
</template>

<script setup lang="ts">
import { farmColumns } from "@/components/pages/farm/columns";
import FarmTable from "@/components/pages/farm/farm-table.vue";
import { useFarmStore } from "@/stores/farm.store";
import { onMounted } from "vue";

const farmStore = useFarmStore()

onMounted(()=>{
    farmStore.init()
})

</script> -->

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useDashboardStore } from "@/stores/dashboard.store";
import { farmColumns } from "@/components/pages/farm/columns";
import FarmTable from "@/components/pages/farm/FarmTable.vue";
import { useFarmStore } from "@/stores/farm.store";
import IndicatorsSection from "./part/IndicatorsSection.vue";
import ChartSection from "./part/ChartSection.vue";
import type { IDashboardIndicators } from "@/interfaces/dashboard.interface";

const useDashboard = useDashboardStore();
const useFarm = useFarmStore();

onMounted(() => {
  useDashboard.fetchDashboard();
  useFarm.fetchFarms()
});

const indicators = computed<IDashboardIndicators | null>(() => {
  return useDashboard.indicators ?? null;
});
const chart = computed(() => useDashboard.chart);
const range = computed(() => useDashboard.range);
const isLoading = computed(() => useDashboard.isLoading);

function changeRange(newRange: "7d" | "30d" | "90d") {
  useDashboard.fetchDashboard(newRange);
}
</script>

<template>
  <div class="p-6 space-y-6">
    <IndicatorsSection :indicators="indicators" :isLoading="isLoading" />

    <ChartSection
      :chart="chart"
      :range="range"
      :isLoading="isLoading"
      @change-range="changeRange"
    />
    <FarmTable :columns="farmColumns" :data="useFarm.farms" />
  </div>
</template>
