<!-- 用户 -->
<template>
  <a-modal v-model:visible="visible"
           :title="title"
           @ok="handleOk"
           @cancel="close">
  </a-modal>
</template>

<script>
import { ref, watch } from "vue";
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: ""
    }
  },
  emits: ["update:show"],
  setup (props, context) {
    watch(
      () => {
        return props.show;
      },
      (newVaule, oldvue) => {
        visible.value = newVaule;
      }
    );
    const handleOk = (e) => {
      context.emit("update:show", false);
    };

    const close = () => {
      context.emit("update:show", false);
    }

    const visible = ref(false);

    return {
      handleOk,
      visible,
      close,
    };
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
