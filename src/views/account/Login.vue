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

        <a-form-item label="验证码" name="code">
          <a-input type="text" v-model:value="modelRef.code" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit" block @click="onSubmit()"
            >登录</a-button
          >
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
import { reactive, ref } from "vue";
import { Login } from "@/api/account.js";
export default {
  name: "Login",
  setup() {
    const formRef = ref();

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

    let checkAge = async (rule, value) => {
      if (!value) {
        return Promise.reject("Please input the age");
      }

      if (!Number.isInteger(value)) {
        return Promise.reject("Please input digits");
      } else {
        if (value < 18) {
          return Promise.reject("Age must be greater than 18");
        } else {
          return Promise.resolve();
        }
      }
    };
    const rules = {
      username: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
          validate: checkAge,
        },
      ],
      password: [
        {
          required: true,
          message: "Please input Activity name",
          trigger: "blur",
        },
      ],
    };

    const onSubmit = () => {
      Login({ username: modelRef.username, password: modelRef.password }).then(
        (response) => {
          console.log(response);
        }
      );
    };

    const submit = () => {
      console.log(formRef.value);
    };

    return {
      ref,
      formConfig,
      modelRef,
      submit,
      onSubmit,
      rules,
    };
  },
};
</script>
<style lang="scss">
@import "./style.scss";
</style>
