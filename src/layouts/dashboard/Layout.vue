<template>
  <SidebarProvider>
    <div class="min-h-screen flex">
      <!-- Sidebar -->

      <dashboard-sidebar />

      <!-- Content -->
      <main>
        <slot />
      </main>
    </div>
  </SidebarProvider>
</template>

<script setup lang="ts">
import DashboardSidebar from "@/layouts/dashboard/part/DashboardSidebar.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
</script>
