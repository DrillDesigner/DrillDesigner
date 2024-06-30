import React from "react";
import { Layout, Typography, Image, Button, Input, Space, Dropdown, MenuProps } from "antd";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import UploadButtonComponent from "./UploadButtonComponent.tsx";
import { UploadFile } from "antd";
import SelectShowComponent from "./SelectShowComponent.tsx";

const { Header } = Layout;
const { Title } = Typography;

interface HeaderComponentProps {
  imageSrc: string;
  children?: React.ReactNode;
  loadStateOnClick: (file: UploadFile[]) => void;
  setShowOnClick: (showToSet: string) => void;
  showTitles: string[];
  selectedShow: string;
  saveShowOnClick: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const items: MenuProps['items'] = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        1st menu item
      </a>
    ),
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: '4',
    danger: true,
    label: 'a danger item',
  },
];

const HeaderComponent = (props: HeaderComponentProps) => {
  return (
    <Header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0",
        paddingLeft: "10px"
      }}
    >
      <div style={{
        display: "flex", 
        flexDirection: "row", 
        height: "100%",
        }}>
        <Image
          style={{
            margin: "-6px 0 0 0",
          }}
          preview={false}
          width={50}
          src={props.imageSrc}
        />
        <div style={{ 
          flexDirection: "column",
          alignContent: "center",
          display: "flex",
          paddingLeft: "8px",
          }}>
          <Space.Compact size="large">
            <Input 
              defaultValue={props.selectedShow}
              variant="borderless"
              style={{
                fontSize: "18px",
                color: "white",
                padding: "7px 0 0 0",
              }}>
            </Input>
          </Space.Compact>
          <div style={{
            display: "flex",
            flexDirection: "row",
            
          }}>
            <Dropdown 
              menu={{ items }}
              placement="bottomLeft"
              >
              <Space>
                File
              </Space>
            </Dropdown>
            <Dropdown 
              menu={{ items }}
              placement="bottomLeft"
              >
              <Space style={{ 
                marginLeft: "15px",
              }}>
                Edit
              </Space>
            </Dropdown>
            <Dropdown 
              menu={{ items }}
              placement="bottomLeft"
              >
              <Space style={{ 
                marginLeft: "15px",
              }}>
                View
              </Space>
            </Dropdown>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div>
          <SelectShowComponent
            setShowOnClick={props.setShowOnClick}
            showTitles={props.showTitles}
            selectedShow={props.selectedShow}
          />
        </div>
        <Button style={{ marginLeft: "20px" }} onClick={props.saveShowOnClick}>
          Save Show to File
        </Button>
        <div style={{ marginLeft: "20px" }}>
          <UploadButtonComponent loadStateOnClick={props.loadStateOnClick} />
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
