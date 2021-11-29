import router from "./index";
import { GetAccessToken } from "@/utils/cookies";

router.beforeEach((to, from, next) => {
  /* 必须调用 `next` */
  console.log(GetAccessToken());
  const token = GetAccessToken();
  if (token) {
    console.log(to);
    console.log(from);
    next();
  } else {
    if (to.name == "Login") {
      next(); // 直接进入
    } else {
      next({ name: "Login" }); //跳转
    }
  }
});
