import service from "@/utils/request.js";

/**
 * 新增用户
 * @param {用户信息} data
 * @returns
 */
export function Create(data) {
  return service.request({
    url: "app-user",
    method: "post",
    data,
  });
}

/**
 * 修改用户
 * @param {用户信息} data
 * @returns
 */
export function Update(id, data) {
  return service.request({
    url: "app-user/" + id,
    method: "put",
    data,
  });
}

/**
 * 删除用户
 * @returns
 */
export function Delete(id) {
  return service.request({
    url: "app-user/" + id,
    method: "delete",
  });
}

/**
 * 获取用户
 * @returns
 */
export function Get(id) {
  return service.request({
    url: "app-user/" + id,
    method: "get",
  });
}

/**
 * 获取用户列表
 * @param {查询参数}} data
 * @returns
 */
export function List(params) {
  return service.request({
    url: "app-user",
    method: "get",
    params,
  });
}
