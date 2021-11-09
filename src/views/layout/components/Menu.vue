<!-- 无限极菜单 递归 -->
<template>
  <a-sub-menu :key="menu.path" :title="menu.meta && menu.meta.title">
    <template #icon>
      <Svg-Icon :iconName="menu.meta.icon" className="aside-svg"></Svg-Icon>
    </template>

    <template v-if="menu.children.length">
      <template v-for="child in menu.children">
        <!-- 不存在子集 -->
        <a-menu-item v-if="!child.children" :key="child.path">
          <template #icon>
            <Svg-Icon
              :iconName="child.meta.icon"
              className="aside-svg"
            ></Svg-Icon>
          </template>
          <router-link :to="child.path">
            {{ child.meta && child.meta.title }}
          </router-link>
        </a-menu-item>
        <!-- 存在子集  递归-->
        <Menu :menu="child" v-else :key="child.path"></Menu>
      </template>
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  name: "Menu",
  props: {
    menu: {
      type: Object,
      defualt: () => ({}),
    },
  },
  setup() {
    return {};
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
