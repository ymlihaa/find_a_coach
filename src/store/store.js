import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    uid: null,
    isActive: false,
    isLoading: true,
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
      (state.uid = ""), (state.isActive = false);
    },
    isLoading(state) {
      state.isLoading = false;
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
      setTimeout(() => {
        commit("isLoading");
      }, 3000);
    },
  },
});
