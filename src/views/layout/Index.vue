<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <LayoutAside></LayoutAside>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <LayoutHeader></LayoutHeader>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <LayoutMain></LayoutMain>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        Ant Design ©2018 Created by Ant UED
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script>
import LayoutAside from "./components/Aside";
import LayoutHeader from "./components/Header";
import LayoutMain from "./components/Main";
import { reactive, toRefs } from "@vue/reactivity";

export default {
  name: "index",
  components: {
    LayoutAside,
    LayoutHeader,
    LayoutMain,
  },
  setup() {
    const data = reactive({
      collapsed: false,
      selectedKeys: ["1"],
    });

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="scss" scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
