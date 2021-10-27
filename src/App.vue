<template>
  <div id="nav">
    <router-link to="/">Home主页</router-link> |
    <router-link to="/about">About关于</router-link> |
    <router-link to="/news">News新闻</router-link> |
    <router-link to="/product">Product产品</router-link>
  </div>
  <router-view />
</template>

<style lang="scss">
#app {
}

</style>
