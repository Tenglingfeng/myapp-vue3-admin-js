<template>
  <a-menu
    mode="inline"
    theme="dark"
    :inline-collapsed="collapsed"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
  >
    <template v-for="item in routes" :key="item">
      <template v-if="!item.hidden">
        <a-menu-item :key="item.path" v-if="!item.children">{{
          item.meta && item.meta.title
        }}</a-menu-item>

        <a-sub-menu
          v-else
          :key="item.path"
          :title="item.meta && item.meta.title"
        >
          <template v-if="item.children.length">
            <a-menu-item v-for="child in item.children" :key="child.path">{{
              child.meta && child.meta.title
            }}</a-menu-item>
          </template>
        </a-sub-menu>
      </template>
    </template>
  </a-menu>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useRouter } from "vue-router";
export default {
  name: "aside",

  setup() {
    const { options } = useRouter();
    const routes = options.routes;
    console.log(routes);
    const state = reactive({
      // collapsed: false,
      selectedKeys: ["/"],
      openKeys: ["/adminIndex"],
      // preOpenKeys: ["sub1"],
    });
    return {
      ...toRefs(state),
      routes,
    };
  },
};
</script>

<style lang="scss" scoped></style>
