import React from "react";
import { message, Upload, UploadFile } from "antd";
import type { GetProp, UploadProps } from "antd";

interface UploadButtonProps {
  loadStateOnClick: (file: UploadFile[]) => void;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const UploadButtonComponent: React.FC<UploadButtonProps> = (
  props: UploadButtonProps,
) => {
  const handleChange: UploadProps["onChange"] = (info) => {
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

  return (
    <div>
      <Upload
        name="uploadShow"
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        customRequest={({ onSuccess }) => handleSuccess({ onSuccess })}
      >
        <div>Upload show</div>
      </Upload>
    </div>
  );
};

export default UploadButtonComponent;
