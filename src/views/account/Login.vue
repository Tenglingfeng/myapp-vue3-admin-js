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
          <a-button type="primary" @click="submit()" block>测试axios</a-button>
        </a-form-item>
      </a-form>
      <div class="text-center fs-12">
        <router-link to="/Forget">忘记密码</router-link>
        <router-link to="/Register">注册</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { GetCode } from "@/api/account.js";
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

    const submit = () => {
      GetCode({});
    };

    return {
      formConfig,
      submit,
    };
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
