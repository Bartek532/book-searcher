import { reactive, toRefs } from "vue";
import { fetcher } from "./fetcher";
import type { User, Book } from "@book-searcher/types";
import { useStore } from "vuex";

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
      state.error = "";
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

export const useRateBook = () => {
  const store = useStore();
  const state = reactive({
    loading: false,
    error: "",
  });

  const rateBook = async (bookId: number, rate: number) => {
    if (state.loading) return;
    state.loading = true;
    try {
      const {
        data,
      }: { data: { message: string } } = await fetcher(
        "/api/books/rate",
        "POST",
        { id: bookId, rate },
      );
      state.error = "";
      store.dispatch("setModal", {
        show: true,
        type: "success",
        message: data.message,
      });
    } catch (e) {
      state.error = e.message;
      store.dispatch("setModal", {
        show: true,
        type: "warning",
        message: e.message,
      });
    } finally {
      state.loading = false;
    }
  };

  return {
    ...toRefs(state),
    rateBook,
  };
};

export const useUserBooks = () => {
  const store = useStore();
  const state = reactive({
    loading: false,
    error: "",
    books: [] as Book[],
  });

  const addToUserBooks = async () => {
    if (state.loading) return;
    state.loading = true;
    try {
      const { data }: { data: { message: string } } = await fetcher(
        "/api/users/books",
        "POST",
      );
      state.error = "";
      store.dispatch("setModal", {
        show: true,
        type: "success",
        message: data.message,
      });
    } catch (e) {
      state.error = e.message;
      store.dispatch("setModal", {
        show: true,
        type: "warning",
        message: e.message,
      });
    } finally {
      state.loading = false;
    }
  };

  const deleteFromUserBooks = async (bookId: number) => {
    if (state.loading) return;
    state.loading = true;
    try {
      const { data }: { data: { message: string } } = await fetcher(
        `/api/users/books/${bookId}`,
        "DELETE",
      );
      state.error = "";
      store.dispatch("setModal", {
        show: true,
        type: "success",
        message: data.message,
      });
    } catch (e) {
      state.error = e.message;
      store.dispatch("setModal", {
        show: true,
        type: "warning",
        message: e.message,
      });
    } finally {
      state.loading = false;
    }
  };

  return {
    ...toRefs(state),
    addToUserBooks,
    deleteFromUserBooks,
  };
};
