import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//and-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

// eslint-disable-next-line prettier/prettier
createApp(App)
.use(store)
.use(router)
.use(Antd)
.mount("#app");