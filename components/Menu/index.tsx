"use client";

import React, { useState } from "react";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";

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
  getItem("Permission", "Permission", <AppstoreOutlined />),
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
