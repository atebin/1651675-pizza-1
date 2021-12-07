import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
/* eslint-disable */
import VuePlugins from "@/plugins/vuePlugins";
/* eslint-enable */

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
