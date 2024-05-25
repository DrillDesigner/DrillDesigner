import React from 'react';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme, Typography , Image } from 'antd';
import useImage from "use-image";

const { Header, Content, Sider } = Layout;
const { Title } = Typography;


interface HeaderComponentProps {
  imageSrc: string;
  children?: React.ReactNode;
}



const HeaderComponent = (props: HeaderComponentProps) => {
    const [image] = useImage(props.imageSrc);


  return (
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Image
          preview={false}
          width={45}
          src={props.imageSrc}
        />
        <Title 
          level={1}
          style={{color: 'white'}}
        >Drill Designer</Title>
      </Header>
  );
}

export default HeaderComponent;