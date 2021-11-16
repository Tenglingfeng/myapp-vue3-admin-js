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
        <a-form-item has-feedback label="用户名" name="username">
          <a-input
            type="text"
            autocomplete="off"
            v-model:value="account_form.username"
            :disabled="account_disabled.username"
          />
        </a-form-item>
        <a-form-item has-feedback label="密码" name="password">
          <a-input
            type="password"
            autocomplete="off"
            v-model:value="account_form.password"
          />
        </a-form-item>
        <a-form-item has-feedback label="确认密码" name="password2">
          <a-input
            type="password"
            autocomplete="off"
            v-model:value="account_form.password2"
          />
        </a-form-item>

        <a-form-item has-feedback label="验证码">
          <a-row :gutter="15">
            <a-col :span="14">
              <a-input
                type="text"
                autocomplete="off"
                maxLength="6"
                v-model:value="account_form.code"
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
import { checkUserNameExist } from "@/api/account";
import { message } from "ant-design-vue";

//局部组件
export default {
  name: "register",
  components: {},
  setup() {
    async function validateUserName(_rule, value) {
      if (!value) {
        dataItem.code_btn_disabled = true;
        return Promise.reject("请输入正确的用户名");
      }
      dataItem.code_btn_disabled = false;
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
        username: "",
        password: "",
        password2: "",
        code: "",
      },
      account_disabled: {
        username: false,
      },
      rules_form: {
        username: [
          {
            validator: validateUserName,
            required: true,
            message: "Please input username",
          },
        ],
        password: [
          {
            required: true,
            message: "Please input password",
          },
        ],
        password2: [
          {
            trigger: "change",
            required: true,
          },
        ],
      },
    });

    const checkUserNameExsit = (value) => {
      formConfig.account_disabled.username = true;
      return checkUserNameExist(value)
        .then((response) => {
          formConfig.account_disabled.username = false;
          return response.data;
        })
        .catch(() => {
          formConfig.account_disabled.username = false;
        });
    };
    const dataItem = reactive({
      button_text: "获取验证码",
      btn_loading: false,
      code_btn_disabled: false,
      sec: 10,
      //定时器
      timer: 0,
    });
    const form = toRefs(formConfig);
    const data = toRefs(dataItem);
    //表单提交
    const handleFinish = (value) => {
      console.log(value);
    };
    //获取验证码
    async function getCode() {
      //用户名不存在的情况
      let b = await checkUserNameExsit(formConfig.account_form.username);
      if (b) {
        message.info("用户名已存在");
      } else {
        //先判断定时器是否存在, 存在则先清除
        if (dataItem.timer) {
          console.log("start timer");
          window.clearInterval(dataItem.timer);
        }
        dataItem.timer = await setInterval(() => {
          dataItem.code_btn_disabled = true;
          let s = dataItem.sec--;
          dataItem.button_text = `${s}秒`;
          if (s <= 0) {
            window.clearInterval(dataItem.timer);
            dataItem.button_text = "重新获取";
            dataItem.code_btn_disabled = false;
          }
        }, 1000);
      }
    }

    return {
      ...form,
      ...data,
      getCode,
      handleFinish,
    };
  },
};
</script>

<style lang="scss">
@import "./style.scss";
</style>
