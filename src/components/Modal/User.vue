<!-- 用户 -->
<template>
  <a-modal v-model:visible="visible"
           :title="title"
           @ok="handleOk"
           @cancel="close"
           :confirm-loading="confirmLoading">

    <a-form :model="formState"
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :rules="rules"
            ref="formRef">
      <a-form-item label="用户名"
                   name="username">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="姓名"
                   name="name">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="手机号"
                   name="phoneNumber">
        <a-input v-model:value="formState.phoneNumber" />
      </a-form-item>
      <a-form-item label="头像">
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
import { ref, watch, reactive, toRaw } from "vue";
//import md5 from "js-md5";

import { Create } from "@/api/account";
import { message } from 'ant-design-vue';

export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: ""
    },
    rowId: {
      type: [String, Number],
      default: ""
    }
  },
  emits: ["update:show"],
  emits: ["update:rowId"],
  setup (props, context) {
    watch(
      () => {
        return props.show;
      },
      (newVaule, oldvue) => {
        visible.value = newVaule;
        console.log(props.rowId)
      }

    );
    const handleOk = (e) => {
      console.log(e)
      confirmLoading.value = true;

      formRef.value
        .validate()
        .then(() => {
          Create(data).then((response) => {
            console.log(response)
            confirmLoading.value = false;
            message.success("创建成功")
            context.emit("update:show", false);
          }).catch(() => {
            confirmLoading.value = false;
          });
        })
        .catch(error => {
          confirmLoading.value = false;
          console.log(error);
        });
    };

    const close = () => {
      console.log(formRef);
      formRef.value.resetFields();
      context.emit("update:show", false);
      context.emit("update:title", "新增用户");
    }

    const visible = ref(false);

    const formState = reactive({
      username: "",
      name: "",
      phoneNumber: "",
      avatar: "",
      roleNames: [],
    });

    const rules = {
      username: [
        {
          required: true,
          message: '用户名必填',
          trigger: 'blur',
        },
        {
          min: 1,
          max: 256,
          message: 'Length should be 1 to 256',
          trigger: 'blur',
        },
      ],
    };

    const formRef = ref();
    const confirmLoading = ref(false);

    let data = toRaw(formState);



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
      confirmLoading
    };
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
