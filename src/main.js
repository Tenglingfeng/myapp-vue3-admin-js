import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//and-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import i18n from "./i18n";

// eslint-disable-next-line prettier/prettier
createApp(App).use(i18n)
  .use(i18n)
  .use(store)
  .use(router)
  .use(Antd)
  .mount("#app");
