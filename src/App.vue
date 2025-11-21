<script setup lang="ts">
import { computed } from "vue";
import { useRoute, RouterView } from "vue-router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";
import DashboardLayout from "@/layouts/dashboard/Layout.vue";
import ConfirmDialogProvider from "@/components/providers/ConfirmDialogProvider.vue";
import LoadingOverlay from "@/components/pages/main/LoadingOverlay.vue";

const route = useRoute();

const layouts: Record<string, any> = {
  default: DefaultLayout,
  auth: AuthLayout,
  dashboard: DashboardLayout,
};

const currentLayout = computed(() => {
  const name = (route.meta.layout as string) || "default";
  return layouts[name] ?? DefaultLayout;
});
</script>

<template>
  <component :is="currentLayout">
    <LoadingOverlay/>
    <RouterView />
    <ConfirmDialogProvider />
  </component>
</template>
