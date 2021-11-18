<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        ref="formRef"
        v-bind="formConfig.layout"
        :rules="rules"
        :model="modelRef"
      >
        <a-form-item label="用户名" name="username" ref="username">
          <a-input
            type="text"
            v-model:value="modelRef.username"
            @change="
              () => {
                $refs.username.onFieldChange();
              }
            "
          />
        </a-form-item>

        <a-form-item label="密码" name="password">
          <a-input type="password" v-model:value="modelRef.password" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit" block @click="onSubmit()"
            >登录</a-button
          >
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
import { reactive, ref } from "vue";
import { Login } from "@/api/account.js";
import { useRouter } from "vue-router";
import {
  SetAccessToken,
  // GetAccessToken,
  // RemoveAccessToken,
} from "@/utils/cookies.js";

export default {
  name: "Login",
  setup() {
    const { push } = useRouter();
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
    const modelRef = reactive({
      password: "",
      username: "",
      code: "",
    });
    const rules = {
      username: [
        {
          required: true,
          trigger: "blur",
        },
      ],
      password: [
        {
          required: true,
          trigger: "blur",
        },
      ],
    };

    const onSubmit = () => {
      Login({ username: modelRef.username, password: modelRef.password }).then(
        (response) => {
          SetAccessToken({ token: response.data.accessToken });
          push({
            name: "index",
          });
        }
      );
    };

    return {
      ref,
      formConfig,
      modelRef,
      onSubmit,
      rules,
    };
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
