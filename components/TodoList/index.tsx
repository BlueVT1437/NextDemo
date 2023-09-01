"use client";

import { useState } from "react";
import { Button, Form, Input, Modal, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const TodoList = () => {
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
    // {
    //   title: "Tags",
    //   key: "tags",
    //   dataIndex: "tags",
    //   render: (_, { tags }) => (
    //     <>
    //       {tags.map((tag) => {
    //         let color = tag.length > 5 ? "geekblue" : "green";
    //         if (tag === "loser") {
    //           color = "volcano";
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </>
    //   ),
    // },
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

  return (
    <div className="w-full m-4 p-8 rounded shadow-2xl drop-shadow-xl">
      <Button
        className="mb-4"
        type="primary"
        onClick={() => setOpenCreate(true)}
      >
        Create New Todo
      </Button>
      <Table columns={columns} dataSource={data} loading={loading} />

      {/* Dialog Edit */}
      <Modal
        title="TODO"
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
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      {/* Dialog Delete */}
      <Modal
        title="Delete this item?"
        open={openDelete}
        onOk={handleDelete}
        onCancel={() => setOpenDelete(false)}
      >
        <p>Are you sure you want to delete this item?</p>
      </Modal>

      {/* Dialog Create */}
      <Modal
        title="Create Todo"
        open={openCreate}
        onOk={form.submit}
        onCancel={() => setOpenCreate(false)}
      >
        <Form name="basic" labelCol={{ span: 4 }} onFinish={submitCreate}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;
