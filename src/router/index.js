import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    hidden: true,
    meta: {
      title: "登录",
    },
    component: () => import("../views/account/Login.vue"),
    children: [],
  },
  {
    path: "/register",
    name: "register",
    hidden: true,
    meta: {
      title: "注册",
    },
    component: () => import("../views/account/Register.vue"),
    children: [],
  },
  {
    path: "/forget",
    name: "forget",
    hidden: true,
    meta: {
      title: "忘记密码",
    },
    component: () => import("../views/account/Forget.vue"),
    children: [],
  },
  {
    path: "/index",
    name: "index",
    meta: {
      title: "首页",
      icon: "home",
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        meta: {
          title: "首111页",
          icon: "home",
        },
        component: () => import("../views/home/Index.vue"),
      },
    ],
  },
  {
    path: "/adminIndex",
    name: "adminIndex",
    meta: {
      title: "管理总台",
      icon: "admin",
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/role",
        name: "role",
        meta: {
          title: "角色",
          icon: "role",
        },
        component: () => import("../views/admin/Role.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "用户",
          icon: "user",
        },
        component: () => import("../views/admin/User.vue"),
      },
      {
        path: "/menu",
        name: "menu",
        meta: {
          title: "菜单",
          icon: "menu",
        },
        component: () => import("../views/admin/User.vue"),
      },
    ],
  },
  {
    path: "/news",
    name: "News",
    meta: {
      title: "信息管理",
      icon: "news",
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/productindex",
        name: "productindex",
        meta: {
          title: "产品管理",
          icon: "index",
        },
        component: () => import("../views/admin/Role.vue"),
      },
    ],
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      title: "产品管理",
      icon: "product",
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/productindex",
        name: "productindex",
        meta: {
          title: "产品管理",
          icon: "index",
        },
        component: () => import("../views/admin/Role.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
