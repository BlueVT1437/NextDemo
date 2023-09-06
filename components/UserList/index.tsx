"use client";

import { useState, useEffect, useRef } from "react";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import useAuth from "@/store/auth";

interface DataType {
  key: string;
  id: string;
  status: boolean;
  name: string;
  email: string;
  role: object[];
}

const UserList = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (_, record) => (
        <>
          {record?.role?.map((roleItem: any, idx: number) => {
            let color =
              roleItem.role === "Admin"
                ? "cyan"
                : roleItem.role === "User"
                ? "purple"
                : "magenta";
            return (
              <Tag color={color} key={idx}>
                {roleItem?.role?.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (record) => (
        <Tag color={record ? "green" : "red"}>
          {record ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          {infoUser.roles.some(
            (itemRole: string) => itemRole === "Manager" || itemRole === "Admin"
          ) && (
            <Space size="middle">
              <Button
                className="btn-view"
                onClick={() => handleOpenEdit(record)}
              >
                View
              </Button>
              <Button danger onClick={() => handleOpenDelete(record)}>
                Delete
              </Button>
              {!record.status && infoUser.roles.includes("Manager") && (
                <Button type="primary" ghost onClick={handleActiveAccount}>
                  Active
                </Button>
              )}
            </Space>
          )}
        </>
      ),
    },
  ];

  interface IUser {
    name?: string;
    password?: string;
    email?: string;
    roles?: string[];
  }

  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [infoUser] = useAuth();

  const currentId = useRef("");

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();

  const handleOpenEdit = (values: any) => {
    const roleList = values.role.map((item: any) => item.role);
    form?.setFieldsValue({ ...values, roles: roleList });
    currentId.current = values.id;

    setOpenEdit(true);
  };

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

  const submitEdit = async (values: IUser) => {
    const getIdRole: Record<string, number> = {
      Admin: 1,
      User: 2,
    };

    const newRoles = values.roles?.map((item: string) => getIdRole[item]);

    await axios({
      method: "put",
      url: `http://localhost:3000/user/${currentId.current}`,
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        role: newRoles,
      },
    })
      .then(async (res) => {
        await getListTableData();
        successMessage(res.data.message);
      })
      .catch((err) => {
        errorMessage();
      });

    setOpenEdit(false);
  };

  const submitCreate = async (values: any) => {
    await axios({
      method: "post",
      url: `http://localhost:3000/auth/register`,
      data: {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.roles,
      },
    })
      .then(async (res) => {
        await getListTableData();
        successMessage(res.data.message);
      })
      .catch((err) => {
        errorMessage();
      });

    setOpenCreate(false);
  };

  const handleDelete = async () => {
    await axios({
      method: "put",
      url: `http://localhost:3000/user/delete/${currentId.current}`,
      data: {
        isActive: false,
      },
    })
      .then(async (res) => {
        await getListTableData();
        successMessage(res.data.message);
      })
      .catch((err) => {
        errorMessage();
      });

    setOpenDelete(false);
  };

  const handleActiveAccount = async () => {
    await axios({
      method: "put",
      url: `http://localhost:3000/user/delete/${currentId.current}`,
      data: {
        isActive: true,
      },
    })
      .then(async (res) => {
        await getListTableData();
        successMessage(res.data.message);
      })
      .catch((err) => {
        errorMessage();
      });
  };

  const handleOpenDelete = (values: any) => {
    currentId.current = values.id;
    setOpenDelete(true);
  };

  useEffect(() => {
    getListTableData();
  }, []);

  const getListTableData = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/user",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setDataList(res.data);
      })
      .catch((err) => {
        errorMessage();
      });
  };

  const handleOpenCreateUser = () => {
    currentId.current = "";
    form.resetFields();
    setOpenCreate(true);
  };

  return (
    <div className="w-full m-4 p-8 rounded shadow-2xl drop-shadow-xl">
      {contextHolder}
      <Button className="mb-4" type="primary" onClick={handleOpenCreateUser}>
        Create New User
      </Button>
      <Table columns={columns} dataSource={dataList} loading={loading} />

      {/* Dialog Edit */}
      <Modal
        title="Edit User"
        className="mt-8"
        open={openEdit}
        onOk={form.submit}
        onCancel={() => setOpenEdit(false)}
      >
        <Form
          form={form}
          name="basics"
          labelCol={{ span: 4 }}
          onFinish={submitEdit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Roles"
            name="roles"
            rules={[{ required: true, message: "Please input user role!" }]}
          >
            <Select
              mode="multiple"
              allowClear
              options={[
                { value: "Admin", label: "Admin" },
                { value: "User", label: "User" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Dialog Delete */}
      <Modal
        title="Delete this user?"
        open={openDelete}
        onOk={handleDelete}
        onCancel={() => setOpenDelete(false)}
      >
        <p>This account will be inactive</p>
      </Modal>

      {/* Dialog Create */}
      <Modal
        title="Create User"
        open={openCreate}
        onCancel={() => setOpenCreate(false)}
        footer={[
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={form.submit}
          >
            Submit
          </Button>,
        ]}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          onFinish={submitCreate}
        >
          <Form.Item<IUser>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser>
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser>
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item<IUser>
            label="Roles"
            name="roles"
            rules={[{ required: true, message: "Please input user roles" }]}
          >
            <Select
              mode="multiple"
              allowClear
              options={[
                { value: "1", label: "Admin" },
                { value: "2", label: "User" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
