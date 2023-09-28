"use client";

import { useState, useEffect, useRef } from "react";
import { Button, Form, Input, Modal, Space, Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import axios from "axios";
import useSWR from "swr";

interface DataType {
  key: string;
  title: string;
  description: string;
}

interface ITodo {
  id?: string;
  title?: string;
  description: string;
}

const TodoList = () => {
  const columns: ColumnsType<DataType> = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="btn-view"
            onClick={() => handleOpenEdit(record as ITodo)}
          >
            View
          </Button>
          <Button danger onClick={() => handleOpenDelete(record)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const [dataList, setDataList] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);

  const getAccessToken = () => {
    return typeof window === "undefined" ? "" : localStorage.getItem("token");
  };

  const tokenAccess = getAccessToken();

  const currentId = useRef("");

  const { TextArea } = Input;
  const [form] = Form.useForm();

  const successMessage = (messageInfo: string) => {
    message.success(messageInfo);
  };

  const errorMessage = () => {
		message.error("This is an error message")
  };

  const handleOpenEdit = (values: any) => {
    currentId.current = values.id;
    form?.setFieldsValue({ ...values });
    setOpenEdit(true);
  };

  const submitEdit = (values: ITodo) => {
    axios({
      method: "put",
      url: `http://localhost:3000/todos/${currentId.current}`,
      headers: {
        Authorization: `Bearer ${tokenAccess}`,
      },
      data: {
        title: values.title,
        description: values.description,
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

  const submitCreate = (values: any) => {
    axios({
      method: "post",
      url: `http://localhost:3000/todos`,
      headers: {
        Authorization: `Bearer ${tokenAccess}`,
      },
      data: {
        title: values.title,
        description: values.description,
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

  const handleDelete = (values: any) => {
    axios({
      method: "delete",
      url: `http://localhost:3000/todos/${currentId.current}`,
      headers: {
        Authorization: `Bearer ${tokenAccess}`,
      },
      data: {
        title: values.title,
        description: values.description,
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

  const handleOpenDelete = (values: any) => {
    currentId.current = values.id;
    setOpenDelete(true);
  };

  useEffect(() => {
    if (tokenAccess) {
      getListTableData();
    }
  }, [tokenAccess]);

  const getListTableData = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/todos",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setDataList(res.data.data);
      })
      .catch((err) => {
        errorMessage();
      });
  };

  const fetcher = async () => {
    const tempData = await axios({
      method: "get",
      url: "http://localhost:3000/todos",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return tempData.data;
  };

  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/todos`,
    fetcher
  );

  return (
    <div className="w-full m-4 p-8 rounded shadow-2xl drop-shadow-xl">
      <Button
        className="mb-4"
        type="primary"
        onClick={() => setOpenCreate(true)}
      >
        Create New Todo
      </Button>
      <Table columns={columns} dataSource={dataList} loading={isLoading} />

      {/* Dialog Edit */}
      <Modal
        title="TODO"
        className="mt-8"
        open={openEdit}
        onOk={form.submit}
        onCancel={() => setOpenEdit(false)}
      >
        <Form form={form} name="basics" layout="vertical" onFinish={submitEdit}>
          <Form.Item label="Title" name="title">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <TextArea rows={4} />
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
        <Form
          name="basic"
          form={form}
          layout="vertical"
          onFinish={submitCreate}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please input description!" }]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TodoList;
