import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    uid: "",
    isActive: false,
    isLoading: true,
  },
  mutations: {
    updateLoginAndRegister(state, payload) {
      state.uid = payload.uid;
      state.isActive = payload.isActive;
    },
    updateLogout(state) {
      (state.uid = ""), (state.isActive = false);
    },
    isLoading(state) {
      state.isLoading = false;
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
