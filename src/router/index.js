import { createRouter, createWebHashHistory } from "vue-router";

const routes = [{
    path: "/",
    name: "Login",
    component: () => import("../views/account/Login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/account/Register.vue"),
  },
  {
    path: "/forget",
    name: "forget",
    component: () => import("../views/account/Forget.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/news",
    name: "News",
    component: () => import("../views/News.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;