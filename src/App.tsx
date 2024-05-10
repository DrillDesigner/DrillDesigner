import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useShowState } from "./utils/PerformersState";
import helper from "./utils/helpers";
import config from "./config/AppConfig";
import { Show } from "./types/Show";
import StageComponent from "./components/StageComponent";
import MenuComponent from "./components/menu/MenuComponent";
import CountSliderComponent from "./components/CountSliderComponent";
import items from "./components/menu/MenuItems";
import UploadButtonComponent from "./components/menu/UploadButtonComponent";

const { Content, Sider, Footer } = Layout;

const initialShow: Show = {
  id: "show-1",
  name: "My Awesome Show",
  performers: Object.fromEntries(
    Array.from({ length: config.defaultNumPerformers }, (_, i) => [
      i,
      helper.randomPerformerLocations(config.defaultNumPerformers),
    ]),
  ),
  count: 1,
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
  } = useShowState(initialShow);

  // empty array means invoked once, adds listener to update windowSize var on 'resize' event
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}>
        <div className="left-sidebar" />
        <MenuComponent
          menuItems={[
            items.positionInLineButton(positionPerformersInLine),
            items.saveShowButton(saveState),
          ]}
        >
          <UploadButtonComponent loadStateOnClick={loadState} />
        </MenuComponent>
      </Sider>
      <Layout>
        <Content style={{}}>
          <StageComponent
            width={config.canvasWidth}
            height={config.canvasHeight}
            show={show}
            count={set}
            updatePosition={updatePositions}
          />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <CountSliderComponent onSlide={handleCountChange} />
        </Footer>
      </Layout>
      <Sider width={(windowSize.width - config.canvasWidth) / 2}>
        <div className="right-sidebar" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" />
      </Sider>
    </Layout>
  );
};

export default App;
