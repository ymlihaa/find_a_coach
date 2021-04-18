import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    isAuthenticated: firebase.auth().currentUser || null,
    loading: false,
    isRequest: false,
    msgCount: 0,
    dialog: false,
    showNav: localStorage.getItem("TOKEN") == "true" || false,
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
    setCurrentUser(state, { isActive }) {
      state.currentUser = isActive;
    },
    changeStateAuth(state, { user }) {
      state.isAuthenticated = user;
    },
    changeNavState(state, { isShow }) {
      state.showNav = isShow;
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
