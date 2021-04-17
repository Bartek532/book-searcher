import { reactive, toRefs } from "vue";
import type { Book } from "@book-searcher/types";
import { useBooks } from "./useBooks";
import { fetcher } from "../fetcher";

export const useInfiniteScroll = () => {
  const state = reactive({
    loading: false,
    results: [] as Book[],
  });

  const { lastBookApiCallAddress, setResults, results } = useBooks();
  const sliceResults = () => {
    setResults([...results.value.slice(270, 300)]);
  };

  const fetchBooks = async (lastId: number) => {
    if (state.loading) return;
    state.loading = true;
    try {
      const { data }: { data: Book[] } = await fetcher(
        `${
          lastBookApiCallAddress.value.includes("?")
            ? lastBookApiCallAddress.value + "&"
            : lastBookApiCallAddress.value + "?"
        }lastId=${lastId}`,
        "GET",
      );
      state.results = data;
      setResults([...results.value, ...data]);
    } catch (e) {
      console.error(e);
    } finally {
      state.loading = false;
    }
  };

  return { ...toRefs(state), sliceResults, fetchBooks };
};
