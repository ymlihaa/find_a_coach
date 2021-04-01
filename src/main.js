import Vue from "vue";
// import App from "./App.vue";
import router from "./router";
import { firestorePlugin } from "vuefire";
import axios from "axios";
import VueAxios from "vue-axios";
import { store } from "./store/store";
import VueEllipseProgress from "vue-ellipse-progress";
import vuetify from "./plugins/vuetify";
import nApp from "./newApp.vue";

Vue.use(firestorePlugin);
Vue.use(VueAxios, axios);
Vue.use(VueEllipseProgress);
Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(nApp),
}).$mount("#app");
