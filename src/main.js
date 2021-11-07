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

// eslint-disable-next-line prettier/prettier
createApp(App).use(i18n)
  .use(i18n)
  .use(store)
  .use(router)
  .use(Antd)
  .component("Svg-Icon", SvgIcon)
  .mount("#app");
