import Vue from "vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
import axios from "axios";
import VueAxios from "vue-axios";
import { store } from "./store/store";
import App from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import AnimatedVue from "animated-vue";
import "animate.css/animate.css";
import i18n from "./i18n";
import firebase from "firebase/app";

import "firebase/auth";
const lang = localStorage.getItem("lang") || "en";
axios.defaults.headers["Accept-Language"] = lang;

let app;

Vue.use(ElementUI);
Vue.use(AnimatedVue);
Vue.use(firestorePlugin);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) => {
  console.log(user);
  if (!app) {
    app = new Vue({
      i18n,
      store,
      AnimatedVue,
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
