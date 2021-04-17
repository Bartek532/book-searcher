import { toRefs, reactive } from "vue";
import type { Book } from "@book-searcher/types";
import { fetcher } from "../fetcher";
import { API_URL } from "../consts";

export const useBooks = () => {
  const state = reactive({
    loading: false,
    error: "",
    lastUrl: "/api/books",
    results: [] as Book[],
  });

  const getBooks = async (url: string) => {
    state.loading = true;
    try {
      const fullUrl = `${API_URL}/api/books` + url;
      const { data }: { data: Book[] } = await fetcher(fullUrl, "GET");
      state.results = data;
      state.error = "";
      state.lastUrl = fullUrl;
    } catch (e) {
      state.error = e?.message;
    } finally {
      state.loading = false;
    }
  };

  return {
    ...toRefs(state),
    getBooks,
  };
};
