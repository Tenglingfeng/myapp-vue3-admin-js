import axios from "axios";
import { message } from "ant-design-vue";

import { GetAccessToken } from "./cookies";

// Set config defaults when creating the instance
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 50000,
});

var token = GetAccessToken();
console.log(token);
// Alter defaults after instance has been created
service.defaults.headers.common["Authorization"] = "Bearer " + token + "";

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    console.log(config);
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    //console.log("response", response.data);
    const data = response.data;
    return data;
  },
  (error) => {
    const data = error.request;
    const response = JSON.parse(data.response);
    //业务错误
    if (data.status == "403") {
      message.error(response.error.message);
    }

    //验证错误
    else if (data.status == "400") {
      response.error.validationErrors.forEach((element) => {
        message.error(element.message);
      });
    }

    //服务器错误
    else if (data.status == "500") {
      message.error("系统错误");
    }
    return Promise.reject(error);
  }
);
export default service;
