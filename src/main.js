import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//and-design-vue
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import i18n from "./i18n";

//svg 全局组件
import SvgIcon from "@/components/SvgIcon.vue";
//svg 文件解析
import "./js/svg";

import axios from "axios";

import "./router/permission";
//import VueAxios from "vue-axios";

// eslint-disable-next-line prettier/prettier
const app = createApp(App);
app.config.globalProperties.$axios = axios;
app
  .use(i18n)
  .use(store)
  .use(router)
  .use(Antd)
  //.use(VueAxios, axios)
  .component("Svg-Icon", SvgIcon)
  .mount("#app");
