import React, { useState, useEffect } from "react";
import { Layout, ConfigProvider, Menu, theme } from "antd";
import { useUserState } from "./utils/UserState";
import helper from "./utils/helpers";
import config from "./config/AppConfig";
import { Show } from "./types/Show";
import StageComponent from "./components/stage/StageComponent";
import MenuComponent from "./components/menu/MenuComponent";
import CountSliderComponent from "./components/menu/CountSliderComponent";
import items from "./components/menu/MenuItems";
import UploadButtonComponent from "./components/menu/UploadButtonComponent";
import { Button, Flex, Segmented } from 'antd';
import { Col, Row, Divider, Space } from 'antd';
import PlayShowButtonComponent from "./components/menu/PlayShowButtonComponent";
import HeaderComponent from "./components/menu/HeaderComponent";
import { User } from "./types/User";

const { Content, Sider, Footer } = Layout;

const initialShow: Show = {
  id: "show-1",
  name: config.initialShowName,
  countPositions: Object.fromEntries(
    Array.from({ length: config.defaultNumCounts }, (_, i) => {
      const yOffsetStart = -config.canvasHeight / 2 + config.fieldHeightAdjustment;
      const yOffsetEnd = config.canvasHeight / 2 + config.fieldHeightAdjustment;
      const stepSize = (yOffsetEnd - yOffsetStart) / (config.defaultNumCounts - 1);
      const yOffset = yOffsetStart + stepSize * i;
      
      return [
        i,
        helper.performersToLine(config.defaultNumPerformers, yOffset),
      ];
    })
  ),
  count: 0,
};

const secondShow: Show = {
  id: "show-1",
  name: "secondShow",
  countPositions: Object.fromEntries(
    Array.from({ length: config.defaultNumCounts }, (_, i) => {
      const yOffsetStart = -config.canvasHeight / 2 + config.fieldHeightAdjustment;
      const yOffsetEnd = config.canvasHeight / 2 + config.fieldHeightAdjustment;
      const stepSize = (yOffsetEnd - yOffsetStart) / (config.defaultNumCounts - 1);
      const yOffset = yOffsetStart + stepSize * i;
      
      return [
        i,
        helper.performersToLine(config.defaultNumPerformers, yOffset+100),
      ];
    })
  ),
  count: 0,
};

const basicUser: User = {
  id: "123",
  name: "Spencer",
  shows: {[config.initialShowName] : initialShow, ["secondShow"] : secondShow},
  initialShowName: config.initialShowName
};

const App: React.FC<object> = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const {
    show,
    positionPerformersInLine,
    saveState,
    loadState,
    set,
    handleCountChange,
    updatePositions,
    playShow,
    setShowButtonCallback
  } = useUserState(basicUser);

  // empty array means invoked once, adds listener to update windowSize var on 'resize' event
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 2,
          colorBgContainer: '#ddebe9',
        },
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <HeaderComponent
          imageSrc={config.performerImageSrc}
          loadStateOnClick={loadState}
          setShowOnClick={setShowButtonCallback}
          showTitles={Object.keys(basicUser.shows)}
          initialSelectedShow={basicUser.initialShowName}>
        </HeaderComponent>
        <Layout>
          <Sider 
            width={(windowSize.width - config.canvasWidth) / 2}
            theme="light">
            <MenuComponent
              menuItems={[
                items.positionInLineButton(positionPerformersInLine),
                items.saveShowButton(saveState),
              ]}>
            </MenuComponent>
          </Sider>
          <Content style={{background: "#ddebe9"}}>
            <Row>
              <StageComponent
                width={config.canvasWidth}
                height={config.canvasHeight}
                show={show}
                count={set}
                updatePosition={updatePositions}
              />
            </Row>
            <Row>
              <Flex style={{
                width: "100%",
                height: "100%",
              }} justify={'space-around'} align={'center'}>
                <PlayShowButtonComponent playShow={playShow}></PlayShowButtonComponent>
                <Button>Add Count</Button>
                <CountSliderComponent onSlide={handleCountChange} />
              </Flex>
            </Row>
          </Content>
          <Sider 
            theme="light"
            width={(windowSize.width - config.canvasWidth) / 2}>
            <Menu defaultSelectedKeys={["1"]} mode="inline" />
          </Sider>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
