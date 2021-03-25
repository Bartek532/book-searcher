import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyLoad from "vue3-lazyload";

createApp(App)
  .use(router)
  .use(store)
  .use(VueLazyLoad)
  .mount("#app");
