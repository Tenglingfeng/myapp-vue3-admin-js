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
  },
  {
    path: "/register",
    name: "register",
    hidden: true,
    meta: {
      title: "注册",
    },
    component: () => import("../views/account/Register.vue"),
  },
  {
    path: "/forget",
    name: "forget",
    hidden: true,
    meta: {
      title: "忘记密码",
    },
    component: () => import("../views/account/Forget.vue"),
  },
  {
    path: "/index",
    name: "index",
    meta: {
      title: "首页",
      icon: "home"
    },
    component: () => import("../views/layout/Index.vue"),
  },
  {
    path: "/adminIndex",
    name: "adminIndex",
    meta: {
      title: "管理总台",
      icon: "admin"
    },
    component: () => import("../views/layout/Index.vue"),
    children: [
      {
        path: "/role",
        name: "role",
        meta: {
          title: "角色",
          icon: "role"
        },
        component: () => import("../views/admin/Role.vue"),
      },
      {
        path: "/user",
        name: "user",
        meta: {
          title: "用户",
          icon: "user"
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
      icon: "news"
    },
    component: () => import("../views/layout/Index.vue"),
  },
  {
    path: "/product",
    name: "Product",
    meta: {
      title: "产品管理",
      icon: "product"
    },
    component: () => import("../views/layout/Index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
