import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import vue3GoogleLogin from "vue3-google-login";
import { createPinia } from "pinia";

import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vue3GoogleLogin, {
  clientId:
    "727433717566-q8ot8bnoi37g8hsvgts93qdr5i2br0ao.apps.googleusercontent.com",
});
app.mount("#app");
