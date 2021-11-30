<!-- 用户 -->
<template>
  <a-modal
    v-model:visible="visible"
    :title="title"
    @ok="handleOk"
    @cancel="close"
    :confirm-loading="confirmLoading"
  >
    <a-form
      :model="formState"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
      ref="formRef"
    >
      <a-form-item label="用户名" name="userName">
        <a-input v-model:value="formState.userName" />
      </a-form-item>

      <a-form-item label="密码" name="password">
        <a-input type="password" v-model:value="formState.password" />
      </a-form-item>
      <a-form-item label="姓名" name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="手机号" name="phoneNumber">
        <a-input v-model:value="formState.phoneNumber" />
      </a-form-item>
      <a-form-item label="头像" name="avatar">
        <a-input v-model:value="formState.avatar" />
      </a-form-item>

      <!-- <a-form-item label="角色"
                   name="roleNames">
        <a-input v-model:value="formState.roleNames" />
      </a-form-item> -->
    </a-form>
  </a-modal>
</template>

<script>
import { ref, watch, reactive } from "vue";
import md5 from "js-md5";

import { Create, Get, Update } from "@/api/user";
import { message } from "ant-design-vue";

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    rowId: {
      type: [String, Number],
      default: "",
    },
  },
  emits: ["update:show,rowId"],

  setup(props, context) {
    let data = {
      id: "",
    };

    watch(
      () => {
        return props.show;
      },
      (newVaule) => {
        visible.value = newVaule;
      }
    );
    watch(
      () => {
        return props.rowId;
      },
      async (newVaule) => {
        data.id = newVaule;
        if (data.id) {
          const res = await GetUser(data.id);
          let keys = Object.keys(res);
          for (let key in formState) {
            if (keys.includes(key)) {
              formState[key] = res[key];
              console.log(key, formState[key]);
            }
          }
        }
      }
    );

    const GetUser = (id) => {
      return Get(id)
        .then((response) => {
          return response.data;
        })
        .catch(() => {});
    };

    const close = () => {
      formRef.value.resetFields();
      console.log(formRef.value);
      context.emit("update:show", false);
      context.emit("update:rowId", "");
      context.emit("update:title", "新增用户");
    };

    const visible = ref(false);

    const formState = reactive({
      userName: "",
      password: "",
      name: "",
      phoneNumber: "",
      avatar: "",
      roleNames: [],
      concurrencyStamp: "",
      extraProperties: {},
    });

    const rules = {
      userName: [
        {
          required: true,
          message: "用户名必填",
          trigger: "blur",
        },
        {
          min: 1,
          max: 256,
          message: "Length should be 1 to 256",
          trigger: "blur",
        },
      ],
      password: [
        {
          validator: validatePass,
          trigger: "change",
        },
      ],
    };

    let validatePass = async (_rule, value) => {
      if (!value && data.id) {
        return Promise.resolve();
      } else if (!value && !data.id) {
        return Promise.reject("Please input the password");
      } else {
        return Promise.resolve();
      }
    };

    const formRef = ref();
    const confirmLoading = ref(false);

    const CreateUser = (data) => {
      Create(data)
        .then(() => {
          confirmLoading.value = false;
          message.success("创建成功");
          close();
        })
        .catch(() => {
          confirmLoading.value = false;
        });
    };

    const UpdateUser = (id, data) => {
      Update(id, data)
        .then(() => {
          confirmLoading.value = false;
          message.success("修改成功");
          close();
        })
        .catch(() => {
          confirmLoading.value = false;
        });
    };

    const handleOk = () => {
      //浅拷贝
      const form_data = Object.assign({}, formState);
      if (form_data.password) {
        form_data.password = md5(form_data.password);
      }
      confirmLoading.value = true;
      console.log(data.id);
      console.log(form_data);
      formRef.value
        .validate()
        .then(() => {
          if (!data.id) {
            CreateUser(form_data);
          } else {
            UpdateUser(data.id, form_data);
          }
        })
        .catch((error) => {
          confirmLoading.value = false;
          console.log(error);
        });
    };

    return {
      handleOk,
      visible,
      close,
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 14,
      },
      formState,
      rules,
      formRef,
      confirmLoading,
      data,
    };
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
