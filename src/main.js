import Vue from "vue";
import App from "./App.vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";
import store from "./store";
import VueScrollReveal from 'vue-scroll-reveal';


Vue.config.productionTip = false;
Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', // A CSS class applied to elements with the v-scroll-reveal directive; useful for animation overrides.
  duration: 200,
  distance: '500px',
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");