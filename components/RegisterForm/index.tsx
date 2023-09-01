import { Button, Checkbox, Form, Input } from "antd";
import "./index.scss";
import { callHttp } from "@/api/callApi";
import { useRouter } from "next/navigation";

type FieldType = {
  name?: string;
  password?: string;
  email?: string;
  rePassword?: string;
};

const RegisterForm = (props: any) => {
  const { setIsLogin } = props;

  const router = useRouter();

  const handleBack = () => {
    setIsLogin(true);
  };

  const onFinish = async (values: FieldType) => {
    if (values.password === values.rePassword) {
      console.log("Success:", values);

      const data = await callHttp({
        method: "post",
        url: "http://localhost:3000/auth/register",
        data: {
          name: values.name,
          email: values.email,
          password: values.password,
        },
      });

      console.log("data", data);

      router.push("/login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form w-60 mr-6">
      <h3 className="font-medium text-xl py-4 mb-4 flex justify-center">
        WELCOME NEW USER
      </h3>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
          rules={[{ required: true, message: "Please input your password!" }]}
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
