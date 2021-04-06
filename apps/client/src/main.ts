import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueLazyLoad from "vue3-lazyload";
import VueFinalModal from "vue-final-modal";

createApp(App)
  .use(router)
  .use(store)
  .use(VueLazyLoad)
  .use(VueFinalModal(), {
    componentName: "VueFinalModal",
    key: "$vfm",
    dynamicContainerName: "ModalsContainer",
  })
  .mount("#app");
