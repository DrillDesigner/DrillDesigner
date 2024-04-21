import React from "react";
import { message, Upload, Menu, UploadFile } from "antd";
import type { MenuProps, GetProp, UploadProps } from "antd";

interface MenuComponentProps {
  lineOnClick: () => void;
  saveShowOnClick: () => void;
  loadStateOnClick: (file: UploadFile[]) => void;
}

type MenuItem = GetProp<MenuProps, "items">[number];
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const MenuComponent = (props: MenuComponentProps) => {
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    onClick?: () => void | ((file: File) => void),
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    } as MenuItem;
  }

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      props.loadStateOnClick(info.fileList);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const beforeUpload = (file: FileType) => {
    const isJson = file.type === "application/json";
    if (!isJson) {
      message.error("You can only upload json file!");
    }
    return isJson;
  };

  const handleSuccess = ({ onSuccess }: any) => {
    onSuccess();
    message.success(`File uploaded successfully`);
  };

  const items: MenuItem[] = [
    getItem(undefined, "designer", "Drill Designer"),
    getItem(
      undefined,
      "box",
      "Position in a Line",
      undefined,
      props.lineOnClick,
    ),
    getItem(
      undefined,
      "saveShow",
      <div>Save Show</div>,
      undefined,
      props.saveShowOnClick,
    ),
    getItem(
      <div>
        <Upload
          name="uploadShow"
          showUploadList={false}
          beforeUpload={beforeUpload}
          onChange={handleChange}
          customRequest={({ onSuccess }) => handleSuccess({ onSuccess })}
          style={{ color: "white" }}
        >
          <div style={{ color: "rgba(255, 255, 255, 0.65)" }}>Upload show</div>
        </Upload>
      </div>,
      "loadState",
    ),
  ];

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
