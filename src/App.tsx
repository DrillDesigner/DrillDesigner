import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';
import StageComponent from './components/StageComponent';
const { Header, Content, Footer, Sider } = Layout;
import config from './config/AppConfig';


const items: MenuProps['items'] = [
  {
    label: 'Drill Designer',
    key: 'designer'
  }
];

const App: React.FC<{}> = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}> 
        <div className="left-sidebar" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
      <Content style={{ }}>
        <StageComponent width={1239} height={710} />
      </Content>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}>
        <div className="right-sidebar" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider>
    </Layout>
  );
};

export default App;