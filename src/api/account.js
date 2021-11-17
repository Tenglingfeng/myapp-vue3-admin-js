import service from "@/utils/request.js";

//定义方法
export function GetValidateCode(params) {
  return service.request({
    // `url` 是用于请求的服务器 URL
    url: "app-user/code/" + params,
    // `method` 是创建请求时使用的方法
    method: "get", // default
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  });
}

//检查用户是否存在
export function UserNameExist(params) {
  return service.request({
    // `url` 是用于请求的服务器 URL
    url: "app-user/check-username/" + params + "/exist",
    // `method` 是创建请求时使用的方法
    method: "get", // default
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
  });
}

//登录接口
export function Login(data) {
  return service.request({
    url: "app-user/login",
    method: "post",
    data: data,
  });
}
/**
 * 注册接口
 * @param {注册信息} data
 * @returns
 */
export function Register(data) {
  return service.request({
    url: "account/register",
    method: "post",
    data,
  });
}
