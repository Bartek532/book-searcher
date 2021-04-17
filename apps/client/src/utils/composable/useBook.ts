import { toRefs, reactive } from "vue";
import type { Book } from "@book-searcher/types";
import { fetcher } from "../fetcher";
import { API_URL } from "../consts";
import { useLoading } from "./useLoading";

export const useBook = () => {
  const state = reactive({
    error: "",
    book: {} as Book,
  });

  const { setLoading } = useLoading();

  const getBook = async (slug: string) => {
    setLoading(true);
    try {
      const { data }: { data: Book } = await fetcher(
        `${API_URL}/api/books/${slug}`,
        "GET",
      );
      state.book = data;
      state.error = "";
    } catch (e) {
      state.error = e?.message;
    } finally {
      setLoading(false);
    }
  };

  return {
    ...toRefs(state),
    getBook,
  };
};
