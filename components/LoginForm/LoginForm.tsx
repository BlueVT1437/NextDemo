import Link from "next/link";
import "./index.scss";
import * as Yup from "yup";
import { useState } from "react";
import { Button, Checkbox, Form, Input, Alert } from "antd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { apiCaller } from "../../api/apiConfig";
import { callHttp } from "@/api/callApi";
import useLoading from "@/utils/useLoading";
import useAuth from "@/store/auth";

interface ILogin {
  email: string;
  password: string;
  remember?: boolean;
}

const LoginForm = (props: any) => {
  const { setIsLogin } = props;
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [isLoginFailed, setIsLoginFailed] = useState(false);
  const [, setAuh] = useAuth();

  const showRegisterForm = () => {
    setIsLogin(false);
  };

  const handleSubmit = async (values: ILogin) => {
    startLoading();

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

        router.push("/home");
      })
      .catch((err) => {
        setIsLoginFailed(true);
      });

    stopLoading();
  };

  return (
    <div className="login-form w-60 mr-6">
      <h3 className="font-medium text-xl pt-4">Welcome Back</h3>
      <p className="text-slate-400 text-xs mt-4">
        Welcome back! Please enter your details
      </p>

      {isLoginFailed && (
        <Alert
          className="mt-2"
          message="Please check your email or password again!"
          type="error"
        />
      )}

      <Form
        name="basic"
        labelCol={{ span: 6 }}
        onFinish={handleSubmit}
        className="mt-4"
      >
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

        <div className="flex justify-between h-8">
          <Form.Item<ILogin> name="remember">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link
            href="/resetPass"
            className="text-cyan-700 hover:text-sky-500 text-xs mt-2"
          >
            Forget Password
          </Link>
        </div>

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
          <Button block className="mt-2 border-2 border-slate-400">
            Sign In with Google
          </Button>
        </Form.Item>
      </Form>

      <div className="mt-8 flex justify-center">
        <span className="text-xs">Don't have a account?</span>
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
