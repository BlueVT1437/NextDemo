import { Alert, Button, Checkbox, Form, Input } from "antd";
import "./index.scss";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useLoading from "@/utils/useLoading";
import axios from "axios";

type FieldType = {
  name?: string;
  password?: string;
  email?: string;
  rePassword?: string;
};

const RegisterForm = (props: any) => {
  const { setIsLogin } = props;
  const USER_ROLE = 2;

  const router = useRouter();

  const [isRegisterFailed, setRegisterFailed] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const handleBack = () => {
    setIsLogin(true);
  };

  const onFinish = async (values: FieldType) => {
    if (values.password === values.rePassword) {
      startLoading();

      // const data = await callHttp({
      //   method: "post",
      //   url: "http://localhost:3000/auth/register",
      //   data: {
      //     name: values.name,
      //     email: values.email,
      //     password: values.password,
      //   },
      // });
      await axios({
        method: "post",
        url: "http://localhost:3000/auth/register",
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
          role: [USER_ROLE],
        },
      })
        .then((res) => {
          handleBack();
        })
        .catch((err) => {
          setRegisterFailed(true);
        });

      // stopLoading();
    } else {
      setRegisterFailed(true);
    }
  };

  return (
    <div className="login-form w-60 mr-6">
      <h3 className="font-medium text-xl py-4 flex justify-center">
        WELCOME NEW USER
      </h3>

      {isRegisterFailed && !isLoading && (
        <Alert
          className="mt-2"
          message="Please check your data!"
          type="error"
        />
      )}

      <Form
        className="mt-4"
        name="basic"
        labelCol={{ span: 8 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item<FieldType>
          label="Re password"
          name="rePassword"
          rules={[
            {
              required: true,
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" block htmlType="submit" className="mt-4">
            Submit
          </Button>
        </Form.Item>
        <Form.Item>
          <Button
            type="default"
            block
            className="border-2 border-slate-400"
            onClick={handleBack}
          >
            Back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
