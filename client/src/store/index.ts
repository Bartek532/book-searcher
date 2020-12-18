import { createStore } from "vuex";
import axios from "axios";
import { types } from "./mutation-types";

const store = createStore({
  state: {
    query: "",
    loading: false,
    results: [],
    error: "",
    isLogIn: false,
    modal: {
      show: false,
      error: false,
      message: ""
    }
  },
  getters: {},
  mutations: {
    [types.UPDATE_QUERY](state, value: string) {
      state.query = value;
    },
    [types.SET_LOADING_STATUS](state, value: boolean) {
      state.loading = value;
    },
    [types.UPDATE_RESULTS](state, value) {
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
      data: { show: boolean; error?: boolean; message?: string }
    ) {
      state.modal.show = data.show;
      if (typeof data.error === "boolean") state.modal.error = data.error;
      if (data.message) state.modal.message = data.message;
    }
  },
  actions: {
    async searchByQuery({ commit, state }) {
      commit(types.SET_LOADING_STATUS, true);
      try {
        const { data } = await axios.get(`/api/books/search?q=${state.query}`);
        commit(types.UPDATE_RESULTS, data);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
      } finally {
        commit(types.SET_LOADING_STATUS, false);
      }
    },
    async searchByRooms({ commit }, filters) {
      let url = "/api/books";
      if (filters) {
        url += filters.place
          ? `/search?room=${filters.room}&place=${filters.place}`
          : `/search?room=${filters.room}`;
      }
      commit(types.SET_LOADING_STATUS, true);
      try {
        const { data } = await axios.get(url);
        commit(types.UPDATE_RESULTS, data);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
      } finally {
        commit(types.SET_LOADING_STATUS, false);
      }
    },
    async searchBySeries({ commit }, series: string) {
      commit(types.SET_LOADING_STATUS, true);
      try {
        const { data } = await axios.get(`/api/books/${series}`);
        commit(types.UPDATE_RESULTS, data);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
      } finally {
        commit(types.SET_LOADING_STATUS, false);
      }
    },
    async advancedSearch({ commit }, query) {
      commit(types.SET_LOADING_STATUS, true);
      try {
        const { data } = await axios.post("/api/books/advancedSearch", query);
        commit(types.UPDATE_RESULTS, data);
        commit(types.SET_ERRORS, "");
      } catch (err) {
        commit(types.SET_ERRORS, err.response.data.message);
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
      data: { show: boolean; error?: boolean; message?: string }
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
    }
  }
});

export default store;
