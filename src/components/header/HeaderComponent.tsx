import React from "react";
import { Layout, Image, Input, Space, Dropdown, MenuProps, UploadFile } from "antd";
import UploadButtonComponent from "./UploadButtonComponent.tsx";
import SelectShowComponent from "./SelectShowComponent.tsx";

const { Header } = Layout;

interface HeaderComponentProps {
  imageSrc: string;
  children?: React.ReactNode;
  loadStateOnClick: (file: UploadFile[]) => void;
  setShowOnClick: (showToSet: string) => void;
  showTitles: string[];
  selectedShow: string;
  saveShowOnClick: () => void;
  selectBackgroundImage: (background: string) => void;
}

const HeaderComponent = (props: HeaderComponentProps) => {
  const selectShowOnClick: MenuProps['onClick'] = (e: Parameters<MenuProps['onClick']>[0]) => {
    if(e.keyPath.includes('selectShow'))
    {
      props.setShowOnClick(e.key);
    }
  };

  const selectBackgroundOnClick: MenuProps['onClick'] = (e: Parameters<MenuProps['onClick']>[0]) => {
    if(e.key === "chartBorderNums")
    {
      props.selectBackgroundImage("src/assets/ChartBorderNums.png");
    }
    if(e.key === "chartMiddleNums")
    {
      props.selectBackgroundImage("src/assets/ChartMiddleNums.png");
    }
  };

  const getShowsToSelect = (showTitles: string[]): MenuProps['items'] => {
    return [
      {
        key: 'new', 
        label: 'New Show'
      },
      {
        key: 'selectShow',
        label: 'Select Show',
        children: showTitles.map((showTitle) => ({
          key: showTitle,
          label: showTitle,
        })),
        
      },
      {
        key: 'saveShow',
        label: "Save Show to File",
        onClick: props.saveShowOnClick,
      },
    ];
  };

  const items: MenuProps['items'] = [
    {
      key: '1', 
      label: 'TODO'
    },
  ];

  const selectBackgroundItems: MenuProps['items'] = [
    {
      key: "chartBorderNums",
      label: "Numbers on Border"
    },
    {
      key: "chartMiddleNums",
      label: "Numbers in Middle"
    }
  ];

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
              menu={{ items: getShowsToSelect(props.showTitles), onClick: selectShowOnClick }}
              placement="bottomLeft">
              <Space>
                File
              </Space>
            </Dropdown>
            <Dropdown 
              menu={{ items }}
              placement="bottomLeft">
              <Space style={{ 
                marginLeft: "15px",
              }}>
                Edit
              </Space>
            </Dropdown>
            <Dropdown 
              menu={{ items: selectBackgroundItems, onClick: selectBackgroundOnClick }}
              placement="bottomLeft">
              <Space style={{ 
                marginLeft: "15px",
              }}>
                View
              </Space>
            </Dropdown>
            <UploadButtonComponent loadStateOnClick={props.loadStateOnClick} />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ 
          marginRight: "20px",
          color: "white",
           }}>
          <Space>TODO: login</Space>
        </div>
      </div>
    </Header>
  );
};

export default HeaderComponent;
