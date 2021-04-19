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

  const setResults = (books: Book[]) => {
    results.value = books;
  };

  const getBooks = async (url: string) => {
    state.loading = true;
    const fullUrl = `${API_URL}/api/books` + url;
    try {
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

  const getUserBooks = async () => {
    state.loading = true;
    const fullUrl = `${API_URL}/api/users/books`;
    try {
      const { data } = await fetcher(fullUrl, "GET");
      results.value = data;
      state.error = "";
      lastBookApiCallAddress.value = fullUrl;
    } catch (e) {
      state.error = e?.message;
    } finally {
      state.loading = false;
    }
  };

  return {
    ...toRefs(state),
    getBooks,
    getUserBooks,
    setResults,
    lastBookApiCallAddress,
    results,
  };
};
