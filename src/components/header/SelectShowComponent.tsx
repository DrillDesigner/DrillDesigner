import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space, MenuProps, Typography } from "antd";
const { Title } = Typography;

interface SelectShowProps {
  setShowOnClick: (showToSet: string) => void;
  showTitles: string[];
  selectedShow: string;
}

const SelectShowComponent: React.FC<SelectShowProps> = (
  props: SelectShowProps,
) => {
  const items: MenuProps["items"] = props.showTitles.map((title) => ({
    label: title,
    key: title,
  }));

  const onClick: MenuProps["onClick"] = ({ key }) => {
    props.setShowOnClick(key);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Title
        level={4}
        style={{
          color: "white",
          marginBottom: "10%",
          marginRight: "5px",
        }}
      >
        Select Show:
      </Title>
      <Dropdown menu={{ items, onClick }}>
        <Button>
          <Space>
            {props.selectedShow}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </div>
  );
};

export default SelectShowComponent;
