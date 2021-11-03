<template>
  <div id="header">
    <div class="header-menu">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          Hover me, Click menu item
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="onClick">
            <a-menu-item key="1">1st menu item</a-menu-item>
            <a-menu-item key="2">{{ $t("hello") }}</a-menu-item>
            <a-menu-item key="3">{{ $t("header_menu.logout") }}</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "header",
};
</script>

<style lang="scss" scoped>
#header {
  padding: 0 20px;
  //height: 200px;
}
.header-menu {
  float: right;
}
</style>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  }
}
</i18n>
