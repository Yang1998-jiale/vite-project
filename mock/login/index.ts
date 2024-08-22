/*
 * @Author: yjl
 * @Date: 2024-08-21 09:10:55
 * @LastEditors: yjl
 * @Description: 描述
 */


import { MockMethod } from "vite-plugin-mock";
import { resultSuccess, resultError } from "../_util";
const User = [
  {
    username: "yjl",
    tel: "18639169182",
    password: "molimicha12138",
  },
];
function createToken() {
  let guid = "";
  for (let i = 1; i <= 32; i++) {
    const n = Math.floor(Math.random() * 16.0).toString(16);
    guid += n;
  }
  return guid;
}
export default [
  {
    url: "/login",
    timeout: 100,
    method: "post",
    response: ({ body }) => {
      const { username, password } = body;
      const findUser = User.find(
        (item) => item.username === username || item.tel === username
      );
      if (findUser && findUser.password === password) {
        return resultSuccess({ token: createToken() }, { message: "成功" });
      } else {
        return resultError("用户名或密码错误！");
      }
    },
  },
  {
    url: "/register",
    timeout: 100,
    method: "post",
    response: ({ body }) => {
      const { username } = body;
      const findUser = User.find(
        (item) => item.username === username || item.tel === username
      );
      if (findUser) {
        return resultError("该用户已存在！");
      } else {
        return resultSuccess({ token: createToken() }, { message: "成功" });
      }
    },
  },
] as MockMethod[];
