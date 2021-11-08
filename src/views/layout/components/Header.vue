<template>
  <div id="header">
    <div class="collapsed-button">
      <Svg-Icon
        iconName="menu"
        className="header-svg"
        @click="colapsedButton()"
      ></Svg-Icon>
    </div>
    <div class="header-menu">
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>
          Hover me, Click menu item
          <DownOutlined />
        </a>
        <template #overlay>
          <a-menu @click="onClick">
            <a-menu-item class="menu-item" key="1">{{
              $t("header_menu.setting")
            }}</a-menu-item>
            <a-menu-item class="menu-item" key="2">{{
              $t("header_menu.info")
            }}</a-menu-item>
            <a-menu-item class="menu-item" key="3">{{
              $t("header_menu.logout")
            }}</a-menu-item>
            <a-menu-item class="menu-item menu-lang" key="4">
              <span
                v-for="lang in data.lang"
                :key="lang.value"
                @click="toggleLang(lang.value)"
                :class="{ current: data.lang_current == lang.value }"
              >
                {{ lang.lable }}
              </span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
import { reactive, getCurrentInstance } from "vue";
import { useI18n } from "vue-i18n";
export default {
  name: "header",
  setup() {
    const { emit } = getCurrentInstance();
    const { locale } = useI18n({ useScope: "global" });
    const data = reactive({
      lang: [
        { lable: "中文", value: "ch" },
        { lable: "En", value: "en" },
      ],
      lang_current: "ch",
    });

    //设置语言
    const toggleLang = (value) => {
      locale.value = value;
      data.lang_current = value;
    };

    //
    const colapsedButton = () => {
      emit("colapsed");
    };

    return {
      data,
      toggleLang,
      colapsedButton,
    };
  },
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
.menu-item {
  padding: 0 20px;
  font-size: 14px;
  color: #333333;
  font-family: "Courier New";
}
.menu-lang {
  span {
    margin-right: 10px;
  }
  .current {
    color: rgb(41, 165, 165);
  }
}
.collapsed-button {
  float: left;
  cursor: pointer;
  font-size: 20px;
}
</style>

<i18n>
{
  "en": {
    "header_menu":{
      "logout":"logout",
      "info":"info",
      "setting":"setting"
    },
    
  },
  "ch":{
     "header_menu":{
      "logout":"退出",
      "info":"资料",
      "setting":"设置"
     } 
    }
}
</i18n>
