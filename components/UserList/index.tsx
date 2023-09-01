"use client";

import { useState } from "react";
import { Button, Form, Input, Modal, Select, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const UserList = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button className="btn-view" onClick={() => handleOpenEdit(record)}>
            View
          </Button>
          <Button danger onClick={() => handleOpenDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
      tags: ["nice", "developer"],
    },
    {
      key: "2",
      name: "Jim Green",
      age: 42,
      address: "London No. 1 Lake Park",
      tags: ["loser"],
    },
    {
      key: "3",
      name: "Joe Black",
      age: 32,
      address: "Sydney No. 1 Lake Park",
      tags: ["cool", "teacher"],
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
  const [form] = Form.useForm();

  const handleOpenEdit = (values: any) => {
    console.log("value", values);
    setOpenEdit(true);
  };

  const submitEdit = (values: any) => {
    console.log("values", values);
    setOpenEdit(false);
  };

  const submitCreate = (values: any) => {
    console.log("values asdasd", values);
    setOpenCreate(false);
  };

  const handleDelete = (values: any) => {
    setOpenDelete(false);
  };

  const handleOpenDelete = (values: any) => {
    console.log("values", values);
    setOpenDelete(true);
  };

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

  return (
    <div className="w-full m-4 p-8 rounded shadow-2xl drop-shadow-xl">
      <Button
        className="mb-4"
        type="primary"
        onClick={() => setOpenCreate(true)}
      >
        Create New User
      </Button>
      <Table columns={columns} dataSource={data} loading={loading} />

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
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Roles"
            name="roles"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Select
              mode="multiple"
              allowClear
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
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
        <Form name="basic" form={form} labelCol={{ span: 4 }} onFinishFailed={onFinishFailed} onFinish={submitCreate}>
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
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserList;
