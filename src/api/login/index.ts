
import { defHttp } from "@/utils/axios/index";
import { LoginParams, LoginResponse } from "./model/types";

enum Api {
  Login = "/login",
  Register = "/register",
}

export const userLogin = (data: LoginParams) =>
  defHttp.post<LoginResponse>({ url: Api.Login, data }, {});

export const userRegister = (data: LoginParams) =>
  defHttp.post<LoginResponse>({ url: Api.Register, data }, {});
