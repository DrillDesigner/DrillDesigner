import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Star, Text } from 'react-konva';
import { generateShapes } from './utils/helpers';

const { Header, Content, Footer } = Layout;


const items: MenuProps['items'] = [
  {
    label: 'Designer',
    key: 'designer'
  }
];



const INITIAL_STATE = generateShapes();

const App: React.FC = () => {
  const [stars, setStars] = React.useState(INITIAL_STATE);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  

  const handleDragStart = (e: any) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = (e: any) => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
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
      <Content style={{ padding: '0 48px' }}>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <Text text="Try to drag a star" />
            {stars.map((star) => (
              <Star
                key={star.id}
                id={star.id}
                x={star.x}
                y={star.y}
                numPoints={5}
                innerRadius={20}
                outerRadius={40}
                fill="#89b717"
                opacity={0.8}
                draggable
                rotation={star.rotation}
                shadowColor="black"
                shadowBlur={10}
                shadowOpacity={0.6}
                shadowOffsetX={star.isDragging ? 10 : 5}
                shadowOffsetY={star.isDragging ? 10 : 5}
                scaleX={star.isDragging ? 1.2 : 1}
                scaleY={star.isDragging ? 1.2 : 1}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              />
            ))}
          </Layer>
        </Stage>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WebDrillDesigner
      </Footer>
    </Layout>
  );
};

export default App;