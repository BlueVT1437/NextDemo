"use client";
import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "@/store/auth";

interface IProfile {
  name?: string;
  email?: string;
}

interface IPassword {
  password: string;
  rePassword: string;
}

const Profile = () => {
  const [infoUser] = useAuth();
  const [form] = Form.useForm();
  const [formPassword] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const [editMode, setEditMode] = useState(false);
  const [editPasswordMode, setEditPasswordMode] = useState(false);

  useEffect(() => {
    getFormData();
  }, []);

  const successMessage = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
    });
  };

  const errorMessage = () => {
    messageApi.open({
      type: "error",
      content: "This is an error message",
    });
  };

  const getFormData = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/user/${infoUser.id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        form.setFieldsValue({
          name: res.data.name,
          email: res.data.email,
        });
      })
      .catch((err) => {
        errorMessage();
      });
  };

  const submitEdit = (values: IProfile) => {
    axios({
      method: "put",
      url: `http://localhost:3000/user/${infoUser.id}`,
      data: {
        name: values.name,
        email: values.email,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (res) => {
        await getFormData();
        successMessage(res.data.message);
        setEditMode(false);
      })
      .catch((err) => {
        errorMessage();
      });
  };

  const updatePassword = (passwordValue: IPassword) => {
    axios({
      method: "put",
      url: `http://localhost:3000/user/password/${infoUser.id}`,
      data: {
        password: passwordValue.password,
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (res) => {
        successMessage(res.data.message);
        formPassword.resetFields();
        setEditPasswordMode(false);
      })
      .catch((err) => {
        errorMessage();
      });
  };

  const handleCancelEdit = () => {
    form.setFieldsValue({
      name: infoUser.name,
      email: infoUser.email,
    });

    setEditMode(!editMode);
  };

  return (
    <div className="w-full h-fit m-8 p-8 rounded shadow-2xl">
      <h3 className="text-2xl text-black">PROFILE</h3>
      {contextHolder}
      <div className="flex justify-between">
        <Form
          form={form}
          className="mt-8 p-8 w-2/5 shadow-2xl"
          name="basics"
          labelCol={{ span: 4 }}
          onFinish={submitEdit}
        >
          <Form.Item<IProfile>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input disabled={!editMode} />
          </Form.Item>
          <Form.Item<IProfile>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input disabled={!editMode} />
          </Form.Item>

          <div className="flex justify-around mt-8">
            <Form.Item className="w-40">
              <Button
                type="default"
                block
                className="border-2 border-slate-400"
                onClick={handleCancelEdit}
              >
                {editMode ? "Cancel" : "Edit"}
              </Button>
            </Form.Item>
            <Form.Item className="w-40">
              <Button
                type="primary"
                block
                htmlType="submit"
                disabled={!editMode}
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>

        <Form
          form={formPassword}
          className="mt-8 p-8 w-1/2 shadow-2xl"
          name="basics"
          labelCol={{ span: 6 }}
          onFinish={updatePassword}
        >
          <Form.Item<IPassword>
            label="New Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input disabled={!editPasswordMode} />
          </Form.Item>
          <Form.Item<IPassword>
            label="Re password"
            name="rePassword"
            dependencies={["password"]}
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
            <Input disabled={!editPasswordMode} />
          </Form.Item>

          <div className="flex justify-around mt-8">
            <Form.Item className="w-40">
              <Button
                type="default"
                block
                className="border-2 border-slate-400"
                onClick={() => setEditPasswordMode(!editPasswordMode)}
              >
                {editPasswordMode ? "Cancel" : "Forget Password"}
              </Button>
            </Form.Item>
            <Form.Item className="w-40">
              <Button
                type="primary"
                block
                htmlType="submit"
                disabled={!editPasswordMode}
              >
                Update Password
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
