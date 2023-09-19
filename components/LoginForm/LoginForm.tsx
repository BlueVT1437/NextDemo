import "./index.scss";
import { useState } from "react";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import useAuth from "@/store/auth";
import { callHttp } from "@/api/callApi";

interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginForm = (props: any) => {
  const { setIsLogin } = props;
  const router = useRouter();
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [, setAuh] = useAuth();
  const [isLoading, setLoading] = useState(false);

  const showRegisterForm = () => {
    setIsLogin(false);
  };

  const handleLoginGG = () => {
    window.location.href = "http://localhost:3000/auth";
  };

  const handleSubmit = async (values: ILogin) => {
    changeStatusLoading(true);

    console.log("load", isLoading);
    await axios({
      method: "post",
      url: "http://localhost:3000/auth/login",
      data: {
        email: values.email,
        password: values.password,
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        const roleList = res.data.user.role.map(
          (item: Record<string, string>) => item.role
        );
        setAuh({ ...res.data.user, roles: roleList });

        setTimeout(() => changeStatusLoading(false), 1000);
        router.push("/home");
      })
      .catch((err) => {
        setIsLoginFailed(true);
      });
  };

  const changeStatusLoading = (status: boolean) => {
    setLoading(status);
  };

  return (
    <div className="login-form w-60 mr-6">
      <h3 className="font-medium text-xl pt-4">Welcome Back</h3>
      <p className="text-slate-400 text-xs mt-4 mb-6">
        Welcome back! Please enter your details
      </p>

      {isLoginFailed && (
        <Alert
          className="mb-4"
          message="Please check your email or password again!"
          type="error"
        />
      )}

      <Form name="basic" layout="vertical" onFinish={handleSubmit}>
        <Form.Item<ILogin>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<ILogin>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            block
            htmlType="submit"
            className="mt-4"
            loading={isLoading}
          >
            Sign In
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            block
            className="mt-2 border-2 border-slate-400"
            onClick={handleLoginGG}
          >
            Sign In with Google
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-8 flex justify-center">
        <span className="text-xs">Don&apos;t have a account?</span>
        <p
          onClick={showRegisterForm}
          className="text-cyan-700 hover:text-sky-500 text-xs ml-2 cursor-pointer"
        >
          Sing Up
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
