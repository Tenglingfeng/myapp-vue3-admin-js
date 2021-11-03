/**
 *
 * @param {手机号} value
 * @returns
 */
export function checkPhone(value) {
  const regPhone = /^1[3456789]\d{9}$/;
  return regPhone.test(value);
}

export function checkPassword() {
  return true;
}
