// import { useState } from "react";
import { userLogin } from "@/api/login/index";
import { setItem, getItem } from "@/utils/cookie";
import { Button, Spin, Form, Input, Checkbox } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthRouter/Auth";
import { useState } from "react";
import BgImage from "@/assets/bgc2.jpg";
import Logo from "@/assets/logo.png";
// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };

export default function Index() {
  const { login: setToken } = useAuth();
  const baseInfo = localStorage.getItem("baseInfo")
    ? JSON.parse(localStorage.getItem("baseInfo") as string)
    : {};
  const [spining, setSpin] = useState(false);
  const [savePass, setSavePass] = useState<boolean>(
    localStorage.getItem("savePass") ? true : false
  );

  const token = getItem("Authorization");
  const navigate = useNavigate();
  if (token) {
    return <Navigate to="/" />;
  }
  function login(data) {
    setSpin(true);
    userLogin(data)
      .then((res) => {
        if (savePass) {
          localStorage.setItem("savePass", "true");
          localStorage.setItem("baseInfo", JSON.stringify(data));
        } else {
          localStorage.setItem("baseInfo", "");
          localStorage.setItem("savePass", "");
        }
        if (res.token) {
          setToken(res.token);
          setItem("Authorization", res.token);
          navigate("/");
        }
      })
      .finally(() => {
        setSpin(false);
      });
  }

  function onFinish(values) {
    login(values);
  }
  function onFinishFailed(_err) {
    // console.log(err);
  }

  function toRegister() {
    navigate("/register");
  }
  return (
    <>
      <div
        className="w-100% h-100%  flex flex-col justify-center items-center bg-auto bg-no-repeat "
        style={{
          background: `url(${BgImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        <Spin spinning={spining} fullscreen />

        <div className="w-3rem  b-rd-0.04rem p-0.24rem bg-#fff  items-center flex flex-col justify-start  translate-y--10% shadow-2xl">
          <img
            src={Logo}
            alt=""
            className=" b-rd-50% w-1.4rem h-1.6rem  b-0.01rem b-#ccc b-solid"
          />
          <div className="!m-0.16rem text-0.25rem font-600">
            欢迎登录阿猹的React
          </div>
          <Form
            name="basic"
            autoComplete="off"
            initialValues={baseInfo}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              className="!m-b-0.24rem"
              name="username"
              rules={[{ required: true, message: "请输入用户名/手机号" }]}
            >
              <Input
                className="w-2.4rem h-0.4rem  b-rd-0.04rem
                "
                placeholder="请输入用户名/手机号"
              />
            </Form.Item>
            <Form.Item
              className="!m-b-0.24rem"
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                className="w-2.4rem h-0.4rem b-rd-0.04rem 
              "
                placeholder="请输入密码"
              />
            </Form.Item>
            <div className="m-b-0.12rem w-100% text-right">
              <Checkbox
                checked={savePass}
                onChange={(e: CheckboxChangeEvent) => {
                  setSavePass(e.target.checked);
                }}
              />
              <span className="m-l-0.08rem">记住密码</span>
            </div>

            <Form.Item className="!m-b-0.24rem">
              <Button
                className="w-2.4rem b-rd-0.04rem h-0.4rem m-t-0.08rem bg-#308297 !hover-bg-#006E8E"
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
            <div
              className="text-right translate-y-[-50%] c-amber cursor-pointer"
              onClick={() => toRegister()}
            >
              <span>立即注册</span>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
