import service from "@/utils/request.js";

//定义方法
export function GetCode(params) {
  return service.request({
    // `url` 是用于请求的服务器 URL
    url: "app-user/code",
    // `method` 是创建请求时使用的方法
    method: "get", // default
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params,
  });
}
