<template>
  <h1 id="logo">
    <img :src="logo" alt="后台管理系统" />
  </h1>
  <a-menu
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    @click="selectMenu"
    @openChange="openMenu"
  >
    <template v-for="item in routes" :key="item">
      <template v-if="!item.hidden">
        <a-menu-item :key="item.path" v-if="!item.children">
          <template #icon>
            <!-- <PieChartOutlined /> -->
            <Svg-Icon
              :iconName="item.meta.icon"
              className="aside-svg"
            ></Svg-Icon>
          </template>
          <router-link :to="item.path"
            >{{ item.meta && item.meta.title }}
          </router-link>
        </a-menu-item>
        <Menu :menu="item" v-else></Menu>
      </template>
    </template>
  </a-menu>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import Menu from "./Menu";

export default {
  name: "aside",
  components: { Menu },
  setup() {
    const { options } = useRouter();
    const routes = options.routes;
    console.log(routes);
    const data = reactive({
      selectedKeys: localStorage.getItem("selectedKeys")
        ? [localStorage.getItem("selectedKeys")]
        : [],
      openKeys: localStorage.getItem("openKeys")
        ? JSON.parse(localStorage.getItem("openKeys"))
        : [],
      logo: require("@/assets/微信截图_20211103230323.png"),
    });

    const selectMenu = ({ key }) => {
      data.selectedKeys = [key];
      localStorage.setItem("selectedKeys", key); //设置 localStorage 缓存
    };

    const openMenu = (openKeys) => {
      data.openKeys = openKeys;
      localStorage.setItem("openKeys", JSON.stringify(openKeys));
    };
    return {
      ...toRefs(data),
      routes,
      selectMenu,
      openMenu,
    };
  },
};
</script>

<style lang="scss" scoped>
#logo {
  padding: 24px 0 20px 0;
  border-bottom: 1px solid #000;
  text-align: center;
  img {
    display: inline-block;
  }
}
</style>
