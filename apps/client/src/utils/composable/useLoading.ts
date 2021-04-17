import { ref, onUnmounted, computed } from "vue";

const loading = ref(0);

export const useLoading = () => {
  const isLoading = ref(false);
  const setLoading = (set: boolean) => {
    if (isLoading.value == set) return;
    isLoading.value = set;
    if (set) loading.value++;
    else loading.value--;
  };
  onUnmounted(() => {
    if (isLoading.value) loading.value--;
    isLoading.value = false;
  });
  return {
    isGlobalLoading: computed(() => loading.value > 0),
    isLoading: computed(() => isLoading.value),
    setLoading,
  };
};
