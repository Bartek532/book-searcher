import { reactive, toRefs } from "vue";
import type { User } from "@book-searcher/types";
import { API_URL } from "../consts";
import { fetcher } from "../fetcher";
import { useModal } from "./useModal";
import { useLoading } from "./useLoading";

export const useUser = () => {
  const state = reactive({
    error: "",
    user: {} as User,
    isLoggedIn: false,
  });

  const { setModal } = useModal();
  const { setLoading } = useLoading();

  const register = async (data: Partial<User>) => {
    setLoading(true);
    try {
      await fetcher(`${API_URL}/api/users`, "POST", data);
      setModal("success", "Wysłano email z linkiem aktywacyjnym. Zaloguj się!");
      state.error = "";
    } catch (e) {
      state.error = e.message;
      setModal("warning", e.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: { email?: string; password?: string }) => {
    setLoading(true);
    try {
      await fetcher(`${API_URL}/api/users/session`, "POST", data);
      state.error = "";
      state.isLoggedIn = true;
    } catch (e) {
      state.error = e.message;
      setModal("warning", e.message);
    } finally {
      setLoading(false);
    }
  };

  const checkLoginStatus = async () => {
    try {
      await fetcher(`${API_URL}/api/users/session/me`, "GET");
      state.error = "";
      state.isLoggedIn = true;
    } catch (e) {
      state.error = e?.message;
      state.isLoggedIn = false;
    }
  };

  return {
    ...toRefs(state),
    register,
    login,
    checkLoginStatus,
  };
};
