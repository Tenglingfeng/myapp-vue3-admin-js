<template>
  <div class="account">
    <div class="form-wrap">
      <a-form
        name="custom-validation"
        ref="formRef"
        v-bind="layout"
        :model="account_form"
        :rules="rules_form"
        @finish="handleFinish"
      >
        <a-form-item has-feedback label="用户名" name="username" ref="username">
          <a-input
            type="text"
            autocomplete="off"
            v-model:value="account_form.username"
            :disabled="account_disabled.username"
            placeholder="请输入用户名"
            @change="
              () => {
                $refs.username.onFieldChange();
              }
            "
          />
        </a-form-item>

        <a-form-item has-feedback label="密码" name="password">
          <a-input-password
            type="password"
            autocomplete="off"
            v-model:value="account_form.password"
            placeholder="请输入密码"
          />
        </a-form-item>

        <a-form-item has-feedback label="名称" name="appname">
          <a-input
            type="text"
            autocomplete="off"
            v-model:value="account_form.appname"
            placeholder="请输入名称"
          />
        </a-form-item>
        <!-- 
        <a-form-item has-feedback label="重复密码" name="password2" ref="pwd2">
          <a-input
            type="password"
            autocomplete="off"
            v-model:value="account_form.password2"
            placeholder="请再次输入密码"
            @change="
              () => {
                $refs.pwd2.onFieldChange();
              }
            "
          />
        </a-form-item> -->
        <a-form-item has-feedback label="邮箱" name="emailAddress">
          <a-input
            type="text"
            autocomplete="off"
            v-model:value="account_form.emailAddress"
            placeholder="请输入邮箱"
          />
        </a-form-item>

        <a-form-item has-feedback label="验证码" name="code">
          <a-row :gutter="15">
            <a-col :span="14">
              <a-input
                type="text"
                autocomplete="off"
                maxLength="6"
                v-model:value="account_form.code"
                placeholder="请输入验证码"
              />
            </a-col>
            <a-col :span="10">
              <a-button
                type="primary"
                block
                @click="getCode"
                :loading="btn_loading"
                :disabled="code_btn_disabled"
              >
                {{ button_text }}
              </a-button>
            </a-col>
          </a-row>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" html-type="submit" block>注册</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
``;
//import { checkPhone } from "@/utils/validation";
import { reactive, toRefs } from "vue";
import { UserNameExist, GetValidateCode, Register } from "@/api/account";
import { message } from "ant-design-vue";
import { useRouter } from "vue-router";
//局部组件
export default {
  name: "register",
  components: {},
  setup() {
    const { push } = useRouter();
    console.log(push);
    async function validateUserName(_rule, value) {
      if (!value) {
        dataItem.code_btn_disabled = true;
        return Promise.reject("请输入正确的用户名");
      }
      return UserNameExist(value).then((response) => {
        formConfig.account_disabled.username = false;
        if (response.data) {
          console.log(response.data);
          dataItem.code_btn_disabled = true;
          return Promise.reject("用户名已存在");
        }
        console.log(response.data);
        dataItem.code_btn_disabled = false;
        return Promise.resolve();
      });
    }
    async function validatePassWord(_rule, value) {
      if (!value) {
        return Promise.reject("两次密码不匹配");
      }
      if (value != formConfig.account_form.password) {
        return Promise.reject("两次密码不匹配");
      }
      return Promise.resolve();
    }
    const formConfig = reactive({
      layout: {
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 14,
        },
      },
      account_form: {
        username: "admin",
        password: "1q2w3E*",
        //password2: "",
        appname: "amdin",
        emailAddress: "admin@gmail.com",
        code: "1234",
      },
      account_disabled: {
        username: false,
      },
      rules_form: {
        username: [
          {
            validator: validateUserName,
            required: true,
          },
        ],
        password: [
          {
            required: true,
          },
        ],

        password2: [
          {
            required: true,
            validator: validatePassWord,
          },
        ],
        emailAddress: [
          {
            trigger: "change",
            required: true,
            message: "邮箱不能为空",
          },
        ],
        code: [
          {
            trigger: "change",
            required: true,
            message: "验证码不能为空",
          },
        ],
      },
    });

    const dataItem = reactive({
      button_text: "获取验证码",
      btn_loading: false,
      code_btn_disabled: true,
      sec: 0,
      //定时器
      timer: 0,
    });
    const form = toRefs(formConfig);
    const data = toRefs(dataItem);

    //表单提交
    const handleFinish = (value) => {
      Register({
        username: value.username,
        password: value.password,
        emailAddress: value.emailAddress,
        appname: value.appname,
      })
        .then(() => {
          message.success("注册成功");
          push({
            name: "Login",
          });
        })
        .catch(() => {});
      console.log(value);
    };
    //获取验证码
    function getCode() {
      dataItem.btn_loading = true;
      dataItem.button_text = "发送中";
      GetValidateCode(formConfig.account_form.username)
        .then((response) => {
          dataItem.btn_loading = false;
          dataItem.code_btn_disabled = true;

          countDown();
          console.log(response);
        })
        .catch(() => {
          dataItem.button_text = "重新获取";
          dataItem.btn_loading = false;
        });
    }
    const countDown = () => {
      formConfig.account_disabled.username = true;
      dataItem.sec = process.env.VUE_APP_CCOUNTSEC;
      //先判断定时器是否存在, 存在则先清除
      if (dataItem.timer) {
        console.log("start timer");
        clearInterval(dataItem.timer);
      }
      dataItem.timer = setInterval(() => {
        const s = dataItem.sec--;
        dataItem.button_text = `${s}秒`;
        if (s <= 0) {
          dataItem.button_text = "重新获取";
          clearInterval(dataItem.timer);
          dataItem.code_btn_disabled = false;
          formConfig.account_disabled.username = false;
        }
      }, 1000);
    };
    return {
      ...form,
      ...data,
      getCode,
      handleFinish,
      countDown,
    };
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
