<script setup lang="ts">
import { computed } from "vue";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { ApexOptions } from "apexcharts";

interface Props {
  chart: Array<{ date: string; farmsCreated: number }>;
  range: "7d" | "30d" | "90d";
  isLoading: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(["change-range"]);

function shortDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}-${d.getDate()}`;
}

const chartSeries = computed(() => [
  {
    name: "Farms",
    data: props.chart.map((p) => p.farmsCreated),
  },
]);

const chartOptions = computed<ApexOptions>(() => ({
  chart: { toolbar: { show: false }, zoom: { enabled: false } },
  stroke: { curve: "smooth", width: 2 },
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 0.4,
      opacityFrom: 0.7,
      opacityTo: 0.1,
      stops: [0, 90, 100],
    },
  },
  xaxis: {
    categories: props.chart.map((p) => shortDate(p.date)),
  },
}));
</script>

<template>
  <Card>
    <CardHeader class="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Total Farms Created</CardTitle>
        <CardDescription>Data over selected range</CardDescription>
      </div>

      <div class="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          :class="range === '90d' ? 'bg-primary text-primary-foreground' : ''"
          @click="emit('change-range', '90d')"
        >
          Last 3 months
        </Button>
        <Button
          size="sm"
          variant="outline"
          :class="range === '30d' ? 'bg-primary text-primary-foreground' : ''"
          @click="emit('change-range', '30d')"
        >
          Last 30 days
        </Button>
        <Button
          size="sm"
          variant="outline"
          :class="range === '7d' ? 'bg-primary text-primary-foreground' : ''"
          @click="emit('change-range', '7d')"
        >
          Last 7 days
        </Button>
      </div>
    </CardHeader>

    <CardContent>
      <div v-if="isLoading" class="h-64 flex items-center justify-center">
        Loading chart...
      </div>

      <div
        v-else-if="chart.length === 0"
        class="h-64 flex items-center justify-center"
      >
        No data available.
      </div>

      <apexchart
        v-else
        type="area"
        height="260"
        :options="chartOptions"
        :series="chartSeries"
      />
    </CardContent>
  </Card>
</template>
