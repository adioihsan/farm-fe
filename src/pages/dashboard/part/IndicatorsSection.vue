<template>
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card v-for="card in cards" :key="card.label">
      <CardHeader class="pb-2">
        <CardDescription>{{ card.label }}</CardDescription>
        <CardTitle class="text-2xl font-bold">
          <span v-if="!isLoading">{{ card.value }}</span>
          <span v-else class="inline-block w-16 h-6 rounded bg-muted animate-pulse"></span>
        </CardTitle>
      </CardHeader>
      <CardContent class="pt-0 text-xs text-muted-foreground">
        {{ card.subtitle }}
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { computed } from "vue";

interface Props {
  indicators: {
    totalUsers: number;
    totalFarms: number;
    partnerFarms: number;
    nonPartnerFarms: number;
    activeSessions: number;
  } | null;
  isLoading: boolean;
}

const props = defineProps<Props>();

const cards = computed(() => {
  const i = props.indicators;
  return [
    {
      label: "Total Users",
      value: i?.totalUsers ?? 0,
      subtitle: "All registered users",
    },
    {
      label: "Total Farms",
      value: i?.totalFarms ?? 0,
      subtitle: "All farms in the system",
    },
    {
      label: "Partner Farms",
      value: `${i?.partnerFarms ?? 0} / ${i?.nonPartnerFarms ?? 0}`,
      subtitle: "Partner / Non-partner farms",
    },
    {
      label: "Active Sessions",
      value: i?.activeSessions ?? 0,
      subtitle: "Currently active logins",
    },
  ];
});
</script>