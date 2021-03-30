import { createStore } from "vuex";
import axios from "axios";
import { types } from "./mutation-types";
import type { Book } from "@book-searcher/types";
import { fetcher } from "../utils/fetcher";
import { buildAdvancedQuery } from "../utils/functions";

const store = createStore({
  state: {
    loading: false,
    results: [] as Book[],
    error: "",
    isLogIn: false,
    modal: {
      show: false,
      type: "error",
      message: "",
    },
  },
  getters: {},
  mutations: {
    [types.SET_LOADING_STATUS](state, value: boolean) {
      state.loading = value;
    },
    [types.UPDATE_RESULTS](state, value: Book[]) {
      state.results = value;
    },
    [types.SET_ERRORS](state, value: string) {
      state.error = value;
    },
    [types.SET_LOGIN_STATUS](state, value: boolean) {
      state.isLogIn = value;
    },
    [types.SET_MODAL_STATUS](
      state,
      data: {
        show: boolean;
        type: "error" | "success" | "info" | "question";
        message?: string;
      },
    ) {
      state.modal.show = data.show;
      state.modal.type = data.type;
      if (data.message) state.modal.message = data.message;
    },
  },
  actions: {
    async getAllBooks({ commit }) {
      commit(types.SET_LOADING_STATUS, true);
      try {
        const { data }: { data: Book[] } = await fetcher("/api/books", "GET");
        commit(types.UPDATE_RESULTS, data);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        console.error(err);
        commit(types.SET_ERRORS, err);
      } finally {
        commit(types.SET_LOADING_STATUS, false);
      }
    },
    async searchByQuery({ commit }, query) {
      commit(types.SET_LOADING_STATUS, true);
      try {
        const { data }: { data: Book[] } = await fetcher(
          `/api/books/search?type=basic&q=${query}`,
          "GET",
        );
        commit(types.UPDATE_RESULTS, data);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        console.error(err);
        commit(types.SET_ERRORS, err);
      } finally {
        commit(types.SET_LOADING_STATUS, false);
      }
    },
    async searchByFilters({ commit }, path: string) {
      commit(types.SET_LOADING_STATUS, true);
      try {
        const { data }: { data: Book[] } = await fetcher(
          `/api/books/search?type=basic&${path}`,
          "GET",
        );
        commit(types.UPDATE_RESULTS, data);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        console.error(err.message);
        commit(types.SET_ERRORS, err);
      } finally {
        commit(types.SET_LOADING_STATUS, false);
      }
    },
    async advancedSearch({ commit }, { tags, title, author }) {
      commit(types.SET_LOADING_STATUS, true);
      try {
        const { data }: { data: Book[] } = await fetcher(
          `/api/books/search?type=advanced&${buildAdvancedQuery(
            tags.split(" "),
            author,
            title,
          )}`,
          "GET",
        );
        commit(types.UPDATE_RESULTS, data);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        console.log(err);
        commit(types.SET_ERRORS, err);
      } finally {
        commit(types.SET_LOADING_STATUS, false);
      }
    },
    async createBook({ commit }, book) {
      try {
        await axios.post("/api/books", book);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
      }
    },
    setModal(
      { commit },
      data: {
        show: boolean;
        type: "error" | "success" | "info" | "question";
        message?: string;
      },
    ) {
      commit(types.SET_MODAL_STATUS, data);
    },
    async login({ commit }, loginData) {
      try {
        await axios.post("/api/users/login", loginData);
        commit(types.SET_LOGIN_STATUS, true);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
      }
    },
    async register({ commit }, registerData) {
      try {
        await axios.post("/api/users/register", registerData);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
      }
    },
    async logout({ commit }) {
      try {
        await axios.get("/api/users/logout");
        commit(types.SET_ERRORS, "");
        commit(types.SET_LOGIN_STATUS, false);
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
      }
    },
    async isLoggedIn({ commit }) {
      try {
        await axios.get("/api/users/islogin");
        commit(types.SET_ERRORS, "");
        commit(types.SET_LOGIN_STATUS, true);
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
        commit(types.SET_LOGIN_STATUS, false);
      }
    },
    async getUserBooks({ commit }) {
      commit(types.SET_LOADING_STATUS, true);
      try {
        const { data } = await axios.get("/api/users/library");
        commit(types.UPDATE_RESULTS, data);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
      } finally {
        commit(types.SET_LOADING_STATUS, false);
      }
    },
  },
});

export default store;
