import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { configure } from "vee-validate";

configure({
  validateOnModelUpdate: false,
  validateOnChange: false,
  validateOnInput: false,
});

createApp(App).use(router).use(store).mount("#app");
