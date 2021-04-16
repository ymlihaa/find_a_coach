import Vue from "vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
import axios from "axios";
import VueAxios from "vue-axios";
import { store } from "./store/store";
import nApp from "./App.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import AnimatedVue from "animated-vue";
import "animate.css/animate.css";
import i18n from "./i18n";

const lang = localStorage.getItem("lang") || "en";
axios.defaults.headers["Accept-Language"] = lang;

Vue.use(ElementUI);
Vue.use(AnimatedVue);
Vue.use(firestorePlugin);
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;

new Vue({
  i18n,
  store,
  AnimatedVue,
  router,
  render: (h) => h(nApp),
}).$mount("#app");
