import { toRefs, reactive } from "vue";
import type { Book } from "@book-searcher/types";
import { fetcher } from "../fetcher";
import { API_URL } from "../consts";
import { useLoading } from "./useLoading";
import { useModal } from "./useModal";

export const useBook = () => {
  const state = reactive({
    error: "",
    book: {} as Book,
    isBookInUserLibrary: false,
  });

  const { setLoading } = useLoading();
  const { setModal } = useModal();

  const getBook = async (slug: string) => {
    setLoading(true);
    try {
      const { data }: { data: Book } = await fetcher(
        `${API_URL}/api/books/${slug}`,
        "GET",
      );
      await checkIfBookIsInUserLibrary(data.id);
      state.book = data;
      state.error = "";
    } catch (e) {
      state.error = e?.message;
    } finally {
      setLoading(false);
    }
  };

  const checkIfBookIsInUserLibrary = async (id: number) => {
    setLoading(true);
    try {
      const { data }: Record<string, string> = await fetcher(
        `${API_URL}/api/users/books/${id}`,
        "GET",
      );
      state.error = "";
      if (data) {
        state.isBookInUserLibrary = true;
      } else {
        state.isBookInUserLibrary = false;
      }
    } catch (e) {
      state.error = e.message;
      state.isBookInUserLibrary = false;
    } finally {
      setLoading(false);
    }
  };

  const addBookToUserLibrary = async (id: number) => {
    setLoading(true);
    try {
      const {
        data,
      }: {
        data: { message: string };
      } = await fetcher(`${API_URL}/api/users/books`, "POST", { id });
      state.error = "";
      state.isBookInUserLibrary = true;
      setModal("success", data.message);
    } catch (e) {
      state.error = e?.message;
      setModal("warning", e?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBookFromUserLibrary = async (id: number) => {
    setLoading(true);
    try {
      const { data }: { data: { message: string } } = await fetcher(
        `${API_URL}/api/users/books/${id}`,
        "DELETE",
      );
      state.error = "";
      state.isBookInUserLibrary = false;
      setModal("success", data.message);
    } catch (e) {
      state.error = e?.message;
      setModal("warning", e?.message);
    } finally {
      setLoading(false);
    }
  };

  const rateBook = async (bookId: number, rate: number) => {
    setLoading(true);
    try {
      const {
        data,
      }: {
        data: { message: string };
      } = await fetcher(`${API_URL}/api/books/rate`, "POST", {
        id: bookId,
        rate,
      });
      setModal("success", data.message);
    } catch (e) {
      state.error = e?.message;
      setModal("warning", e?.message);
    } finally {
      setLoading(false);
    }
  };

  const moveBook = async (data: {
    id: number;
    room: string;
    place: string;
  }) => {
    setLoading(true);
    try {
      await fetcher(`${API_URL}/api/books`, "PUT", data);
      state.error = "";
      setModal("success", "Zmieniono położenie książki!");
    } catch (e) {
      state.error = e?.message;
      setModal("warning", e?.message);
    } finally {
      setLoading(false);
    }
  };

  const createBook = async (book: FormData) => {
    setLoading(true);
    try {
      await fetcher(`${API_URL}/api/books`, "POST", book);
      state.error = "";
      setModal("success", "Dodano książkę!");
    } catch (e) {
      state.error = e?.message;
      setModal("warning", e?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...toRefs(state),
    getBook,
    checkIfBookIsInUserLibrary,
    addBookToUserLibrary,
    deleteBookFromUserLibrary,
    rateBook,
    moveBook,
    createBook,
  };
};
