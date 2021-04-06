import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    uid: null,
    isActive: false,
    loading: false,
    isRequest: false,
    msgCount: 0,
    currentUserEmail: "",
    dialog: false,
  },
  mutations: {
    updateLoginAndRegister(state, payload) {
      state.uid = payload.uid;
      state.isActive = payload.isActive;
      state.currentUserEmail = payload.mail;
    },
    updateLogout(state) {
      state.uid = null;
      state.isActive = false;
    },
    showLoading(state, payload) {
      state.loading = payload.isLoading;
      console.log("mutations : ", state.loading);
    },
    isRequest(state) {
      state.isRequest = !state.isRequest;
    },
    isDialog(state, payload) {
      state.dialog = payload.isShow;
    },
  },

  actions: {
    isLoading({ commit }) {
      commit("showLoading", { isLoading: true });
      setTimeout(() => {
        commit("showLoading", { isLoading: false });
        console.log("over progress");
      }, 500);
    },
  },
});
