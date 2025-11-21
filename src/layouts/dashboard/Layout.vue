<template>
  <SidebarProvider>
    <div class="min-h-screen flex w-full">
      <!-- Sidebar -->

      <dashboard-sidebar />
      <SidebarInset>
        <header
          class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12"
        >
        <div class="flex items-center justify-between gap-2 px-4 w-full">
          <div class="flex items-center justify-center gap-2">
            <SidebarTrigger class="-ml-1" />
            <h1 class="text-xl font-medium mb-1">{{ route.meta.title || "" }}</h1>
          </div>
        </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div class="min-h-screen flex-1 rounded-xl bg-muted/50 md:min-h-min">
            <slot />
          </div>
        </div>
      </SidebarInset>
      <!-- Content -->
    </div>
  </SidebarProvider>
</template>

<script setup lang="ts">
import DashboardSidebar from "@/layouts/dashboard/part/DashboardSidebar.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
import SidebarInset from "@/components/ui/sidebar/SidebarInset.vue";
import SidebarTrigger from "@/components/ui/sidebar/SidebarTrigger.vue";
import { useRoute } from "vue-router";


const route = useRoute()
</script>
