"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vuex_1 = require("vuex");
const mutation_types_1 = require("./mutation-types");
const fetcher_1 = require("../utils/fetcher");
const store = vuex_1.createStore({
    state: {
        loadingBooks: false,
        loading: false,
        results: [],
        lastBookApiCallAddress: "",
        error: "",
        isLogIn: false,
        modal: {
            show: false,
            type: "warning",
            message: "",
        },
    },
    mutations: {
        [mutation_types_1.types.SET_LOADING_BOOKS_STATUS](state, value) {
            state.loadingBooks = value;
        },
        [mutation_types_1.types.SET_LOADING_STATUS](state, value) {
            state.loading = value;
        },
        [mutation_types_1.types.UPDATE_RESULTS](state, value) {
            state.results = value;
        },
        [mutation_types_1.types.SET_ERRORS](state, value) {
            state.error = value;
        },
        [mutation_types_1.types.SET_LOGIN_STATUS](state, value) {
            state.isLogIn = value;
        },
        [mutation_types_1.types.SET_LAST_API_ADDRESS](state, url) {
            state.lastBookApiCallAddress = url;
        },
        [mutation_types_1.types.SET_MODAL_STATUS](state, data) {
            state.modal.show = data.show;
            state.modal.type = data.type;
            if (data.message)
                state.modal.message = data.message;
        },
    },
    actions: {
        async searchBooks({ commit }, url) {
            commit(mutation_types_1.types.SET_LOADING_BOOKS_STATUS, true);
            try {
                const { data } = await fetcher_1.fetcher("/api/books" + url, "GET");
                commit(mutation_types_1.types.UPDATE_RESULTS, data);
                commit(mutation_types_1.types.SET_LAST_API_ADDRESS, url);
                commit(mutation_types_1.types.SET_ERRORS, "");
            }
            catch (err) {
                console.error(err);
                commit(mutation_types_1.types.SET_ERRORS, err);
            }
            finally {
                commit(mutation_types_1.types.SET_LOADING_BOOKS_STATUS, false);
            }
        },
        async createBook({ commit }, book) {
            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
            try {
                await fetcher_1.fetcher("/api/books", "POST", book);
                commit(mutation_types_1.types.SET_ERRORS, "");
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "success",
                    message: "Dodano książkę!",
                });
            }
            catch (err) {
                commit(mutation_types_1.types.SET_ERRORS, err.message);
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "warning",
                    message: err.message,
                });
            }
            finally {
                commit(mutation_types_1.types.SET_LOADING_STATUS, false);
            }
        },
        async moveBook({ commit }, data) {
            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
            try {
                await fetcher_1.fetcher("/api/books", "PUT", data);
                commit(mutation_types_1.types.SET_ERRORS, "");
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "success",
                    message: "Zmieniono położenie książki!",
                });
            }
            catch (err) {
                commit(mutation_types_1.types.SET_ERRORS, err.message);
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "warning",
                    message: err.message,
                });
            }
            finally {
                commit(mutation_types_1.types.SET_LOADING_STATUS, false);
            }
        },
        setModal({ commit }, data) {
            commit(mutation_types_1.types.SET_MODAL_STATUS, data);
        },
        async login({ commit }, loginData) {
            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
            try {
                await fetcher_1.fetcher("/api/users/session", "POST", loginData);
                commit(mutation_types_1.types.SET_LOGIN_STATUS, true);
                commit(mutation_types_1.types.SET_ERRORS, "");
            }
            catch (err) {
                commit(mutation_types_1.types.SET_ERRORS, err.message);
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "warning",
                    message: err.message,
                });
            }
            finally {
                commit(mutation_types_1.types.SET_LOADING_STATUS, false);
            }
        },
        async register({ commit }, registerData) {
            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
            try {
                await fetcher_1.fetcher("/api/users", "POST", registerData);
                commit(mutation_types_1.types.SET_ERRORS, "");
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "success",
                    message: "Wysłano email z linkiem aktywacyjnym. Zaloguj się!",
                });
            }
            catch (err) {
                commit(mutation_types_1.types.SET_ERRORS, err.message);
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "warning",
                    message: err.message,
                });
            }
            finally {
                commit(mutation_types_1.types.SET_LOADING_STATUS, false);
            }
        },
        async logout({ commit }) {
            try {
                await fetcher_1.fetcher("/api/users/session", "DELETE");
                commit(mutation_types_1.types.SET_ERRORS, "");
                commit(mutation_types_1.types.SET_LOGIN_STATUS, false);
            }
            catch (err) {
                commit(mutation_types_1.types.SET_ERRORS, err.message);
            }
        },
        async isLoggedIn({ commit }) {
            try {
                await fetcher_1.fetcher("/api/users/session/me", "GET");
                commit(mutation_types_1.types.SET_ERRORS, "");
                commit(mutation_types_1.types.SET_LOGIN_STATUS, true);
            }
            catch (err) {
                commit(mutation_types_1.types.SET_ERRORS, err);
                commit(mutation_types_1.types.SET_LOGIN_STATUS, false);
            }
        },
        async modifyUserData({ commit }, data) {
            commit(mutation_types_1.types.SET_LOADING_STATUS, true);
            try {
                await fetcher_1.fetcher("/api/users", "PUT", data);
                commit(mutation_types_1.types.SET_ERRORS, "");
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "success",
                    message: "Zmieniono dane użytkownika.",
                });
            }
            catch (err) {
                commit(mutation_types_1.types.SET_ERRORS, err.message);
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "warning",
                    message: err.message,
                });
            }
            finally {
                commit(mutation_types_1.types.SET_LOADING_STATUS, false);
            }
        },
        async getUserBooks({ commit }) {
            commit(mutation_types_1.types.SET_LOADING_BOOKS_STATUS, true);
            const url = "/api/users/books";
            try {
                const { data } = await fetcher_1.fetcher(url, "GET");
                commit(mutation_types_1.types.UPDATE_RESULTS, data);
                commit(mutation_types_1.types.SET_LAST_API_ADDRESS, url);
                commit(mutation_types_1.types.SET_ERRORS, "");
            }
            catch (err) {
                commit(mutation_types_1.types.SET_ERRORS, err.message);
                commit(mutation_types_1.types.SET_MODAL_STATUS, {
                    show: true,
                    type: "warning",
                    message: err.message,
                });
            }
            finally {
                commit(mutation_types_1.types.SET_LOADING_BOOKS_STATUS, false);
            }
        },
    },
});
exports.default = store;
