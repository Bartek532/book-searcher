import { toRefs, reactive, ref } from "vue";
import type { Book } from "@book-searcher/types";
import { fetcher } from "../fetcher";
import { API_URL } from "../consts";

const lastBookApiCallAddress = ref("/api/books");
const results = ref<Book[]>([]);

export const useBooks = () => {
  const state = reactive({
    loading: false,
    error: "",
  });

  const getBooks = async (url: string) => {
    state.loading = true;
    try {
      const fullUrl = `${API_URL}/api/books` + url;
      const { data }: { data: Book[] } = await fetcher(fullUrl, "GET");
      results.value = data;
      state.error = "";
      lastBookApiCallAddress.value = fullUrl;
    } catch (e) {
      state.error = e?.message;
    } finally {
      state.loading = false;
    }
  };

  const setResults = (books: Book[]) => {
    results.value = books;
  };

  return {
    ...toRefs(state),
    getBooks,
    setResults,
    lastBookApiCallAddress,
    results,
  };
};
