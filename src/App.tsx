import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';
import StageComponent from './components/StageComponent';
const { Header, Content, Footer, Sider } = Layout;
import config from './config/AppConfig';
import PositionButtonComponent from './components/PositionButtonComponent';
import MenuComponent from './components/MenuComponent';
import { Performer } from './types/Performer';
import helper from './utils/helpers';

const INITIAL_STATE: Performer[] = helper.generateShapes(config.defaultNumPerformers);

const App: React.FC<{}> = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [performers, setPerformers] = useState(INITIAL_STATE);


  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

    const handleAddPerformer = () => {
    const newPerformer: Performer = {
      id: String(performers!.length + 1), 
      x: Math.random() * config.canvasWidth, 
      y: Math.random() * config.canvasHeight, 
      rotation: Math.random() * 180, 
      isDragging: false,
    };
    addPerformer(newPerformer); 
  };

  const addPerformer = (performer: Performer) => {
    setPerformers((prevPerformers) => [...prevPerformers, performer]);
  };


  return (
    <Layout style={{ height: '100vh' }}>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}> 
        <div className="left-sidebar" />
       <MenuComponent onClick={handleAddPerformer}/>
      </Sider>
      <Content style={{ }}>
        <StageComponent width={config.canvasWidth} height={config.canvasHeight} performers={performers}/>
      </Content>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}>
        <div className="right-sidebar" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" />
      </Sider>
    </Layout>
  );
};

export default App;