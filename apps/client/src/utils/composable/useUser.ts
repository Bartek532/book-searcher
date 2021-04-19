import { reactive, toRefs, ref } from "vue";
import type { User } from "@book-searcher/types";
import { API_URL } from "../consts";
import { fetcher } from "../fetcher";
import { useModal } from "./useModal";
import { useLoading } from "./useLoading";

export type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type ModifyUserData = {
  name: string;
  email: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const isLoggedIn = ref(false);

export const useUser = () => {
  const state = reactive({
    error: "",
    user: {} as User,
  });

  const { setModal } = useModal();
  const { setLoading } = useLoading();

  const register = async (data: RegisterData) => {
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
      isLoggedIn.value = true;
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
      isLoggedIn.value = true;
    } catch (e) {
      state.error = e?.message;
      isLoggedIn.value = false;
    }
  };

  const getUserInfo = async () => {
    setLoading(true);
    try {
      const { data }: { data: User } = await fetcher(
        `${API_URL}/api/users`,
        "GET",
      );
      state.user = data;
      state.error = "";
    } catch (e) {
      state.error = e?.message;
    } finally {
      setLoading(false);
    }
  };

  const modifyUserInfo = async (data: ModifyUserData) => {
    setLoading(true);
    try {
      await fetcher(`${API_URL}/api/users`, "PUT", data);
      state.error = "";
      setModal("success", "Zmieniono dane użytkownika.");
    } catch (e) {
      state.error = e?.message;
      setModal("warning", e?.message);
    } finally {
      setLoading(false);
    }
  };

  const sendResetPasswordEmail = async (email: string) => {
    setLoading(true);
    try {
      const {
        data,
      }: {
        data: { message: string };
      } = await fetcher(`${API_URL}/api/users/passwordReset`, "POST", {
        email,
      });
      setModal("success", data.message);
    } catch (e) {
      state.error = e?.message;
      setModal("warning", e?.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string,
  ) => {
    setLoading(true);
    try {
      await fetcher(`${API_URL}/api/users/passwordReset`, "PUT", {
        token,
        password,
        confirmPassword,
      });
      setModal("success", "Pomyślnie zmieniono hasło. Zaloguj się!");
    } catch (e) {
      state.error = e?.message;
      setModal("warning", e?.message);
    } finally {
      setLoading(false);
    }
  };

  const activateAccount = async (token: string) => {
    setLoading(true);
    try {
      const { data }: { data: { message: string } } = await fetcher(
        `${API_URL}/api/users/activate`,
        "POST",
        {
          token,
        },
      );
      setModal("success", data.message);
    } catch (e) {
      state.error = e?.message;
      setModal("warning", e?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    ...toRefs(state),
    isLoggedIn,
    register,
    login,
    checkLoginStatus,
    getUserInfo,
    modifyUserInfo,
    sendResetPasswordEmail,
    resetPassword,
    activateAccount,
  };
};
