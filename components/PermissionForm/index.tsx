"use client";

import { callHttp } from "@/api/callApi";
import { isEmpty } from "@/utils/Util";
import { Button, Checkbox, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

const PermissionForm = () => {
  const [roleList, setRoleList] = useState([]);
  const [permissionList, setPermissionList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [currentRoleId, setCurrentRoleId] = useState(0)

  useEffect(() => {
    getUserList();
    getPermissionList();
  }, []);

  const successMessage = (messageInfo: string) => {
    message.success(messageInfo);
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

    setPermissionList(tempData);
  };

  const handleCheck = (checkedValues: CheckboxValueType[]) => {
    setCheckedList(checkedValues as any);
  };

  const handleSelectUser = async (idRole: number) => {
    setCurrentRoleId(idRole);
    if (idRole === 3) {
      const allPermission = permissionList.map(
        (permission: any) => permission.value
      );

      setCheckedList(allPermission as any);
    } else {
      const dataRole = await callHttp({
        method: "get",
        url: `http://localhost:3000/role/${idRole}`,
      });

      const allowPermission = dataRole.data.permissions.map(
        (permissionValue: any) => permissionValue.id
      );

      setCheckedList(allowPermission);
    }
  };

  const UpdatePermission = async () => {
    const dataRole = await callHttp({
      method: "put",
      url: `http://localhost:3000/role`,
      data: {
        idRole: currentRoleId,
        idPermission: checkedList,
      },
    });

    successMessage(dataRole.data.message);
  };

  return (
    <div className="w-full m-4 p-8 rounded shadow-2xl drop-shadow-xl">
      <p className="text-xl">PERMISSION USER</p>

      <div className="flex items-center justify-between mt-2">
        <div className="flex">
          <p className="mr-4">Please choose user:</p>
          <Select
            allowClear
            style={{ width: 450 }}
            options={roleList}
            onChange={handleSelectUser}
          />
        </div>
        <div className="w-40">
          <Button
            className="pt-4 border-2 flex items-center"
            type="primary"
            block
            onClick={UpdatePermission}
          >
            Update Permission
          </Button>
        </div>
      </div>

      <div className="mt-8 p-8 shadow-2xl rounded-2xl">
        <Checkbox.Group
          className="grid grid-cols-3 gap-4"
          options={permissionList}
          value={checkedList}
          onChange={handleCheck}
        />
      </div>
    </div>
  );
};

export default PermissionForm;
