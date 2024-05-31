import { useState } from "react";
import React from "react";
import { DownOutlined } from '@ant-design/icons';
import { message, Button, Dropdown, Space, MenuProps } from 'antd';
import { Show } from "../../types/Show";

interface SelectShowProps {
  setShowOnClick: (showToSet: string) => void;
  showTitles: string[];
  initialSelectedShow: string;
}

const SelectShowComponent: React.FC<SelectShowProps> = (props: SelectShowProps) => {
  const [selectedShow, setSelectedShow] = useState<string>(props.initialSelectedShow);

  const items: MenuProps['items'] = props.showTitles.map((title) => ({
    label: title,
    key: title,
  }));

  const onClick: MenuProps['onClick'] = ({ key }) => {
    props.setShowOnClick(key);
    setSelectedShow(key);
  };

  return (
    <Dropdown menu={{ items, onClick }}>
      <Button>
        <Space>
          {selectedShow}
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

export default SelectShowComponent;