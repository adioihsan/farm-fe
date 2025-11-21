import { ref, readonly } from "vue";

const loading = ref(false);
const loadingText = ref<string | null>(null);

export function useGlobalLoading() {
  function showLoading(text?: string) {
    loading.value = true;
    loadingText.value = text || null;
  }

  function hideLoading() {
    loading.value = false;
    loadingText.value = null;
  }

  return {
    loading: readonly(loading),
    loadingText: readonly(loadingText),
    showLoading,
    hideLoading,
  };
}
