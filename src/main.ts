import { createApp, watch } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState)
app.use(pinia);

app.use(router);

app.mount("#app");


