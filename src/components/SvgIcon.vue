<template>
  <svg class="svg-class">
    <use :href="'#' + iconName" :class="className"></use>
  </svg>
</template>
<script>
export default {
  name: "SvgIcon",
  props: {
    iconName: {
      type: String,
      default: "",
    },
    className: {
      type: String,
      default: "",
    },
  },
  setup() {},
};
</script>

<style lang="scss" scoped></style>
