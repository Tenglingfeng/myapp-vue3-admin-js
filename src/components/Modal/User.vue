<!-- 用户 -->
<template>
  <a-modal
    v-model:visible="visible"
    title="新增用户"
    @ok="handleOk"
    @cancel="close"
  >
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
  },
  emits: ["update:show"],
  setup(props, context) {
    const visible = ref(false);
    console.log(props.show);
    watch(
      () => props.show,
      (newVaule, oldValue) => {
        console.log(newVaule);
        console.log(oldValue);
        visible.value = newVaule;
      }
    );
    const handleOk = (e) => {
      console.log(e);
      visible.value = false;
    };

    const close = () => {
      console.log("11");
      context.emit("update:show", false);
      console.log("2");
    };
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
