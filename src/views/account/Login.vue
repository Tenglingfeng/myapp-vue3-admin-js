<template>
  <div class="account">
    <div class="form-wrap">
      <a-form name="custom-validation" ref="formRef" v-bind="formConfig.layout">
        <a-form-item has-feedback label="用户名" name="pass">
          <a-input type="text" autocomplete="off" />
        </a-form-item>

        <a-form-item has-feedback label="密码" name="pass">
          <a-input type="password" autocomplete="off" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit" block>登录</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <a class="color-white" href="">忘记密码</a> |
        <a class="color-white" href="">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Login",
  setup() {
    const formConfig = reactive({
      layout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      },
    });

    // 生命周期结束
    onMounted(() => {});

    return { formConfig };
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
