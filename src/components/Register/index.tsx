// import { useState } from "react";
import { userRegister } from "@/api/login/index";
import { setItem, getItem } from "@/utils/cookie";
import { Button, Spin, Form, Input, message } from "antd";
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
  const { register: setToken } = useAuth();
  const [form] = Form.useForm();
  const [spining, setSpin] = useState(false);

  const token = getItem("Authorization");
  const navigate = useNavigate();
  if (token) {
    return <Navigate to="/" />;
  }
  function register(data) {
    setSpin(true);
    userRegister(data)
      .then((res) => {
        if (res.token) {
          setToken(res.token);
          setItem("Authorization", res.token);
          message.success("注册成功");
          navigate("/");
        }
      })
      .finally(() => {
        setSpin(false);
      });
  }

  function onFinish(values) {
    register(values);
  }
  function onFinishFailed(_err) {
    // console.log(err);
  }

  function verifyPassword(_rule, value) {
    if (!value) {
      return Promise.reject("确认密码不能为空");
    }
    if (value !== form.getFieldValue("password")) {
      return Promise.reject("确认密码必须与密码相同");
    }
    return Promise.resolve();
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
          <div className="!m-0.16rem text-0.25rem font-600">注册</div>
          <Form
            name="register"
            form={form}
            autoComplete="off"
            initialValues={{
              username: undefined,
              password: undefined,
              confirmPassword: undefined,
            }}
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
            <Form.Item
              className="!m-b-0.24rem"
              name="confirmPassword"
              rules={[{ required: true, validator: verifyPassword }]}
            >
              <Input.Password
                className="w-2.4rem h-0.4rem b-rd-0.04rem 
              "
                placeholder="请再次输入密码"
              />
            </Form.Item>
            <Form.Item className="!m-b-0.24rem">
              <Button
                className="w-2.4rem b-rd-0.04rem h-0.4rem m-t-0.08rem bg-#308297 !hover-bg-#006E8E"
                type="primary"
                htmlType="submit"
              >
                注册并登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
