<template>
  <h1 id="logo">
    <img :src="logo"
         alt="后台管理系统" />
  </h1>
  <a-menu mode="inline"
          theme="dark"
          :inline-collapsed="collapsed"
          v-model:openKeys="openKeys"
          v-model:selectedKeys="selectedKeys"
          @click="selectMenu"
          @openChange="openMenu">
    <template v-for="item in routes"
              :key="item">
      <template v-if="!item.hidden">
        <a-menu-item :key="item.path"
                     v-if="!item.children">

          <template #icon>
            <!-- <PieChartOutlined /> -->
            <SvgIcon :iconName="item.meta.icon"
                     className="aside-svg"></SvgIcon>
          </template>
          <router-link :to="item.path">{{item.meta && item.meta.title}} </router-link>
        </a-menu-item>

        <a-sub-menu v-else
                    :key="item.path"
                    :title="item.meta && item.meta.title">
          <template #icon>
            <SvgIcon :iconName="item.meta.icon"
                     className="aside-svg"></SvgIcon>
          </template>
          <template v-if="item.children.length">
            <a-menu-item v-for="child in item.children"
                         :key="child.path">
              <template #icon>
                <SvgIcon :iconName="child.meta.icon"
                         className="aside-svg"></SvgIcon>
              </template>
              <router-link :to="child.path"> {{child.meta && child.meta.title}} </router-link>
            </a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";

export default {
  name: "aside",
  components: {

    SvgIcon,
  },
  setup () {
    const { options } = useRouter();
    const routes = options.routes;
    console.log(routes);
    const data = reactive({
      // collapsed: false,
      selectedKeys: localStorage.getItem("selectedKeys") ? [localStorage.getItem("selectedKeys")] : [],
      openKeys: localStorage.getItem("openKeys") ? [localStorage.getItem("openKeys")] : [],
      // preOpenKeys: ["sub1"],
      logo: require("@/assets/微信截图_20211103230323.png")
    });

    const selectMenu = ({ key }) => {
      data.selectedKeys = [key];
      localStorage.setItem("selectedKeys", key) //设置 localStorage 缓存
    }

    const openMenu = (openKeys) => {
      data.openKeys = openKeys;
      localStorage.setItem("openKeys", openKeys)
      console.log(openKeys)
    }
    return {
      ...toRefs(data),
      routes,
      selectMenu,
      openMenu
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
