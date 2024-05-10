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

  // const handleChange: UploadProps["onChange"] = (info) => {
  //   if (info.file.status !== "uploading") {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === "done") {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //     props.loadStateOnClick(info.fileList);
  //   } else if (info.file.status === "error") {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // };

  // const beforeUpload = (file: FileType) => {
  //   const isJson = file.type === "application/json";
  //   if (!isJson) {
  //     message.error("You can only upload json file!");
  //   }
  //   return isJson;
  // };

  // const handleSuccess = ({ onSuccess }: any) => {
  //   onSuccess();
  //   message.success(`File uploaded successfully`);
  // };

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

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={["1"]}
      mode="inline"
      items={items}
    />
  );
};

export default MenuComponent;
