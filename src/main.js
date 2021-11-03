import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//and-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import createI18n from "vue-i18n";
const i18n = createI18n({
  local: "en",
  messages: {
    ch: require("./languages/ch"),
    en: require("./languages/en"),
  },
});

// eslint-disable-next-line prettier/prettier
createApp(App)
.use(store)
.use(router)
.use(Antd)
.use(i18n)
.mount("#app");
