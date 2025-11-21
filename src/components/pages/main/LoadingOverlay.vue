<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="loading"
        class="fixed inset-0 z-9999 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      >
        <div
          class="flex flex-col items-center gap-3 rounded-xl bg-white px-6 py-4 shadow-lg"
        >
          <div
            class="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-600"
          />
          <p class="text-sm text-gray-700">
            {{ loadingText || "Loading..." }}
          </p>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useGlobalLoading } from "@/composables/useGlobalLoading";

const { loading, loadingText } = useGlobalLoading();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
