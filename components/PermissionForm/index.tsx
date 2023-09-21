"use client";

import { callHttp } from "@/api/callApi";
import { isEmpty } from "@/utils/Util";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

const PermissionForm = () => {
  const [form] = Form.useForm();

  const [roleList, setRoleList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);

  const addPermission = async (values: any) => {
    console.log("addPermission", values);
  };

  useEffect(() => {
    getUserList();
    getPermissionList();
  }, []);

  const successMessage = (messageInfo: string) => {
    message.success(messageInfo);
  };

  const errorMessage = () => {
    message.error("This is an error message");
  };

  const getUserList = async () => {
    const data = await callHttp({
      method: "get",
      url: `http://localhost:3000/role`,
    });

    if (!isEmpty(data.data)) {
      const tempDataUsers = data.data.map(
        (itemUser: Record<string, string>) => ({
          ...itemUser,
          label: itemUser.role,
          value: itemUser.id,
        })
      );

      setRoleList(tempDataUsers);
    }
  };

  const getPermissionList = async () => {
    const data = await callHttp({
      method: "get",
      url: `http://localhost:3000/permissions`,
    });

    const tempData = data.data.map((permission: Record<string, string>) => ({
      ...permission,
      value: permission.id,
      label: permission.permission,
    }));

    console.log(
      "check result",
      data.data.map((item: any) => item.id)
    );
    // setCheckedList(data.data.map((item: any) => item.id));
    setPermissionList(tempData);
  };

  const handleCheck = (checkedValues: CheckboxValueType[]) => {
    // callHttp({
    //   method: "get",
    //   url: `http://localhost:3000/user/${checkedValues[0]}`,
    // });
  };

  const handleSelectUser = (idRole: number) => {
    if (idRole === 3) {
			const allPermission = permissionList.map((permission: any) => permission.value)
			console.log('allPermission', allPermission);
			setCheckedList(allPermission as any)
    } else {
      callHttp({
        method: "get",
        url: `http://localhost:3000/role/${idRole}`,
      });
    }
  };

  return (
    <div className="w-full m-4 p-8 rounded shadow-2xl drop-shadow-xl">
      <p className="text-xl">PERMISSION USER</p>

      <div className="flex items-center mt-2">
        <p className="mr-4">Please choose user:</p>
        <Select
          allowClear
          style={{ width: 450 }}
          options={roleList}
          onChange={handleSelectUser}
          defaultValue={2}
        />
      </div>

      <div className="mt-8 p-8 shadow-2xl rounded-2xl">
        <Checkbox.Group
          className="grid grid-cols-3 gap-4"
          options={permissionList}
          defaultValue={checkedList}
          onChange={handleCheck}
        />
      </div>
    </div>
  );
};

export default PermissionForm;
