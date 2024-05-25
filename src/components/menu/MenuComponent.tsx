import React from "react";
import { message, Upload, Menu, UploadFile } from "antd";
import type { MenuProps, GetProp, UploadProps } from "antd";

interface MenuItemProps {
  label: React.ReactNode;
  key?: React.Key | null;
  icon?: React.ReactNode;
  onClick: () => void | ((file: UploadFile[]) => boolean);
}

interface MenuComponentProps {
  menuItems?: MenuItemProps[];
  children?: React.ReactNode;
}

type MenuItem = GetProp<MenuProps, "items">[number];
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const MenuComponent = (props: MenuComponentProps) => {
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    onClick?: () => void | ((file: UploadFile[]) => boolean),
  ): MenuItem {
    return {
      key,
      icon,
      label,
      onClick,
    } as MenuItem;
  }

  const items: MenuItem[] = [];
  props.menuItems?.forEach((menuItemProps) => {
    items.push(
      getItem(
        menuItemProps.label,
        menuItemProps.key,
        menuItemProps.icon,
        menuItemProps.onClick,
      ),
    );
  });

  items.push(getItem(props.children));

  return (
    <Menu
      theme="light"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
};

export default MenuComponent;
