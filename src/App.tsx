import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';

import StageComponent from './components/StageComponent';

const { Header, Content, Footer } = Layout;


const items: MenuProps['items'] = [
  {
    label: 'Drill Designer',
    key: 'designer'
  }
];

const App: React.FC = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <Layout style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ flex: 1, padding: '0 48px', overflow: 'hidden' }}>
        <StageComponent width={windowSize.width} height={windowSize.height} />
      </Content>
    </Layout>
  );
};

export default App;