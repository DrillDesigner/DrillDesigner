import React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Typography , Image } from 'antd';
import useImage from "use-image";
import UploadButtonComponent from './UploadButtonComponent';
import { message, Upload, UploadFile } from "antd";
import SelectShowComponent from './SelectShowComponent';
import { Show } from '../../types/Show';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;


interface HeaderComponentProps {
  imageSrc: string;
  children?: React.ReactNode;
  loadStateOnClick: (file: UploadFile[]) => void;
  setShowOnClick: (showToSet: string) => void;
  showTitles: string[];
  initialSelectedShow: string;
}

const HeaderComponent = (props: HeaderComponentProps) => {
  const [image] = useImage(props.imageSrc);

  return (
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          style={{
            margin: '-6px 0 0 0'
          }}
          preview={false}
          width={50}
          src={props.imageSrc}
        />
        <Title 
          level={1}
          style={{
            color: 'white',
            margin: '-2px 0 0 0'
            }}
        >Drill Designer</Title>
      </div>
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <UploadButtonComponent loadStateOnClick={props.loadStateOnClick}/>
        <div style={{ marginLeft: '20px' }}>
          <SelectShowComponent 
            setShowOnClick={props.setShowOnClick}
            showTitles={props.showTitles}
            initialSelectedShow={props.initialSelectedShow}
          />
        </div>
      </div>
    </Header>
  );
}

export default HeaderComponent;