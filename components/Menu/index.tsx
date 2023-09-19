"use client";

import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
	getItem("Todo List", "Todos", <PieChartOutlined />),
  getItem("User List", "Users", <DesktopOutlined />),
  getItem("Profile", "Profile", <ContainerOutlined />),

  // getItem("Navigation One", "sub1", <MailOutlined />, [
  //   getItem("Option 5", "5"),
  //   getItem("Option 6", "6"),
  //   getItem("Option 7", "7"),
  //   getItem("Option 8", "8"),
  // ]),

  // getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
  //   getItem("Option 9", "9"),
  //   getItem("Option 10", "10"),
  // ]),
];

interface IMenu {
  setShowPage: (value: string) => void;
}

const MenuNavigation = (props: IMenu) => {
  const { setShowPage } = props;

  const handleMenu = (value: any) => {
    setShowPage(value.key);
  };

  return (
    <div className="w-60 bg-black">
      {/* <Button type="primary" onClick={toggleCollapsed}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button> */}
      <Menu
        defaultSelectedKeys={["Todos"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        items={items}
        onClick={handleMenu}
      />
    </div>
  );
};

export default MenuNavigation;
