import { reactive, toRefs } from "vue";
import { fetcher } from "./fetcher";
import type { User } from "@book-searcher/types";

export const useUserInfo = () => {
  const state = reactive({
    loading: false,
    error: "",
    user: {} as User,
  });

  const load = async () => {
    if (state.loading) return;
    state.loading = true;
    try {
      const { data }: { data: User } = await fetcher("/api/users", "GET");
      state.user = data;
    } catch (e) {
      state.error = e.message;
    } finally {
      state.loading = false;
    }
  };

  return {
    ...toRefs(state),
    load,
  };
};
