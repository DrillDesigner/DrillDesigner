import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import { Stage, Layer, Star, Text } from 'react-konva';
import StageComponent from './components/StageComponent';
const { Header, Content, Footer, Sider } = Layout;
import config from './config/AppConfig';
import MenuComponent from './components/MenuComponent';
import { Performer } from './types/Performer';
import helper from './utils/helpers';
import { useShowState } from './utils/PerformersState';
import { Show } from './types/Show';

const initialShow: Show = {
  id: 'show-1',
  name: 'My Awesome Show',
  performers: {
    1: helper.generateShapes(config.defaultNumPerformers),
  },
};

const App: React.FC<{}> = () => {
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const { show, handleDragStart, handleDragEnd, addPerformer, positionPerformersInLine, saveState, loadState, set } = useShowState(initialShow);
  
  // empty array means invoked once, adds listener to update windowSize var on 'resize' event
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
       <MenuComponent lineOnClick={positionPerformersInLine} saveShowOnClick={saveState} loadStateOnClick={(loadState)}/>
      </Sider>
      <Content style={{ }}>
        <StageComponent width={config.canvasWidth} height={config.canvasHeight} show={show} count={set} />
      </Content>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}>
        <div className="right-sidebar" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" />
      </Sider>
    </Layout>
  );
};

export default App;