"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUserPassword = exports.useUserBooks = exports.useRateBook = exports.useUserInfo = void 0;
const vue_1 = require("vue");
const fetcher_1 = require("./fetcher");
const vuex_1 = require("vuex");
const useUserInfo = () => {
    const state = vue_1.reactive({
        loading: false,
        error: "",
        user: {},
    });
    const load = async () => {
        if (state.loading)
            return;
        state.loading = true;
        try {
            const { data } = await fetcher_1.fetcher("/api/users", "GET");
            state.user = data;
            state.error = "";
        }
        catch (e) {
            state.error = e.message;
        }
        finally {
            state.loading = false;
        }
    };
    return {
        ...vue_1.toRefs(state),
        load,
    };
};
exports.useUserInfo = useUserInfo;
const useRateBook = () => {
    const store = vuex_1.useStore();
    const loading = vue_1.ref(false);
    const rateBook = async (bookId, rate) => {
        if (loading.value)
            return;
        loading.value = true;
        try {
            const { data, } = await fetcher_1.fetcher("/api/books/rate", "POST", { id: bookId, rate });
            store.dispatch("setModal", {
                show: true,
                type: "success",
                message: data.message,
            });
        }
        catch (e) {
            store.dispatch("setModal", {
                show: true,
                type: "warning",
                message: e.message,
            });
        }
        finally {
            loading.value = false;
        }
    };
    return {
        loading,
        rateBook,
    };
};
exports.useRateBook = useRateBook;
const useUserBooks = () => {
    const store = vuex_1.useStore();
    const state = vue_1.reactive({
        loading: false,
        error: "",
        book: {},
    });
    const getUserBook = async (id) => {
        if (state.loading)
            return;
        state.loading = true;
        try {
            const { data } = await fetcher_1.fetcher(`/api/users/books/${id}`, "GET");
            state.error = "";
            state.book = data;
        }
        catch (e) {
            state.error = e.message;
        }
        finally {
            state.loading = false;
        }
    };
    const addToUserBooks = async (id) => {
        if (state.loading)
            return;
        state.loading = true;
        try {
            const { data, } = await fetcher_1.fetcher("/api/users/books", "POST", { id });
            state.error = "";
            store.dispatch("setModal", {
                show: true,
                type: "success",
                message: data.message,
            });
        }
        catch (e) {
            state.error = e.message;
            store.dispatch("setModal", {
                show: true,
                type: "warning",
                message: e.message,
            });
        }
        finally {
            state.loading = false;
        }
    };
    const deleteFromUserBooks = async (id) => {
        if (state.loading)
            return;
        state.loading = true;
        try {
            const { data } = await fetcher_1.fetcher(`/api/users/books/${id}`, "DELETE");
            state.error = "";
            store.dispatch("setModal", {
                show: true,
                type: "success",
                message: data.message,
            });
        }
        catch (e) {
            state.error = e.message;
            store.dispatch("setModal", {
                show: true,
                type: "warning",
                message: e.message,
            });
        }
        finally {
            state.loading = false;
        }
    };
    return {
        ...vue_1.toRefs(state),
        addToUserBooks,
        getUserBook,
        deleteFromUserBooks,
    };
};
exports.useUserBooks = useUserBooks;
const useUserPassword = () => {
    const store = vuex_1.useStore();
    const loading = vue_1.ref(false);
    const sendResetEmail = async (email) => {
        if (loading.value)
            return;
        loading.value = true;
        try {
            const { data, } = await fetcher_1.fetcher(`/api/users/passwordReset`, "POST", { email });
            store.dispatch("setModal", {
                show: true,
                type: "success",
                message: data.message,
            });
        }
        catch (e) {
            store.dispatch("setModal", {
                show: true,
                type: "warning",
                message: e.message,
            });
        }
        finally {
            loading.value = false;
        }
    };
    const resetPassword = async (token, password, confirmPassword) => {
        try {
            await fetcher_1.fetcher(`/api/users/passwordReset`, "PUT", {
                token,
                password,
                confirmPassword,
            });
            store.dispatch("setModal", {
                show: true,
                type: "success",
                message: "Pomyślnie zmieniono hasło. Zaloguj się!",
            });
        }
        catch (e) {
            store.dispatch("setModal", {
                show: true,
                type: "warning",
                message: e.message,
            });
        }
        finally {
            loading.value = false;
        }
    };
    return {
        loading,
        sendResetEmail,
        resetPassword,
    };
};
exports.useUserPassword = useUserPassword;
