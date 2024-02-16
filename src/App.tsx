import { useState } from 'react'
import { Breadcrumb, Layout, Menu, theme, ConfigProvider } from 'antd';
import type { MenuProps } from 'antd';

const { Header, Content, Footer } = Layout;


const items: MenuProps['items'] = [
  {
    label: 'Designer',
    key: 'designer'
  }
];

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: '0 48px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          Content
          Content
          Content
          Content
          Content
          Content
          Content
          Content
          Content
          Content
          Content
          Content
          Content
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        WebDrillDesigner
      </Footer>
    </Layout>
    
    
  );
};

export default App;