import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "./plugins/socketio";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";

import ml5 from "ml5";
Object.defineProperty(Vue.prototype, "$ml5", { value: ml5 });

Vue.config.productionTip = false;
Vue.config.devtools = true;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
