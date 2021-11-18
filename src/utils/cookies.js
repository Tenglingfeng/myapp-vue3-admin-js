import Cookies from "js-cookie";

const accessToken = "accessToken";
/**
 * 设置token
 * @param {token} params
 */
export function SetAccessToken(params) {
  Cookies.set(accessToken, params.token);
}

/**
 * 获取token
 */
export function GetAccessToken() {
  return Cookies.get(accessToken);
}

/**
 * 删除token
 */
export function RemoveAccessToken() {
  return Cookies.remove(accessToken);
}
