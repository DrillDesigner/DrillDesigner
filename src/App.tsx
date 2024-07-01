import React, { useState, useEffect } from "react";
import { Layout, ConfigProvider, Menu, Row } from "antd";
import { useShowState } from "./utils/ShowState";
import utils from "./utils/Utils";
import config from "./config/AppConfig";
import StageComponent from "./components/stage/StageComponent";
import HeaderComponent from "./components/header/HeaderComponent";
import PlayControlsComponent from "./components/stageControls/PlayControlsComponent";
import { User } from "./types/User";
import { Show } from "./types/Show";
import PerformerControlsComponent from "./components/menu/PerformerControlsComponent";

const { Content, Sider } = Layout;

const initialShow: Show = {
  id: config.initialShowName,
  countPositions: Object.fromEntries(
    Array.from({ length: config.defaultNumCounts }, (_, i) => {
      const stepSize = (245 + 265) / (config.defaultNumCounts - 1);
      const yOffsets = Array.from(
        { length: config.defaultNumCounts },
        (_, performerIndex) => {
          const performerOffset = performerIndex * stepSize;
          return performerOffset - 265;
        },
      );
      return [
        i,
        utils.performersToLine(config.defaultNumPerformers, yOffsets[i]),
      ];
    }),
  ),
  count: 0,
};

const secondShow: Show = {
  id: "Second Show",
  countPositions: Object.fromEntries(
    Array.from({ length: config.defaultNumCounts }, (_, i) => {
      return [i, initialShow.countPositions[config.defaultNumCounts - i - 1]];
    }),
  ),
  count: 0,
};

const basicUser: User = {
  id: "123",
  name: "Spencer",
  shows: { [config.initialShowName]: initialShow, ["Second Show"]: secondShow },
  initialShowName: config.initialShowName,
};

const App: React.FC<object> = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [backgroundImageSrc, setBackgroundImage] = useState(
    config.backgroundImageSrc,
  );

  const {
    show,
    positionPerformersInLine,
    saveState,
    loadState,
    count,
    handleCountSliderChange,
    toggleShowPlaying,
    setShowButtonCallback,
    addCountCallback,
    sliderPosition,
    showPlaying,
    selectPerformers,
    updatePerformersPositions,
    undo,
    redo,
  } = useShowState(basicUser);

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
          colorBgContainer: "#ddebe9",
        },
      }}
    >
      <Layout style={{ height: "100vh" }}>
        <HeaderComponent
          imageSrc={config.performerImageSrc}
          loadStateOnClick={loadState}
          setShowOnClick={setShowButtonCallback}
          showTitles={Object.keys(basicUser.shows)}
          selectedShow={show.id}
          saveShowOnClick={saveState}
          selectBackgroundImage={setBackgroundImage}
        ></HeaderComponent>
        <Layout>
          <PerformerControlsComponent
            windowSize={windowSize}
            positionPerformersInLine={positionPerformersInLine}
            undoOnClick={undo}
            redoOnClick={redo}
          />
          <Content style={{ background: "#ddebe9" }}>
            <Row>
              <StageComponent
                width={config.canvasWidth}
                height={config.canvasHeight}
                show={show}
                count={count}
                selectPerformers={selectPerformers}
                updatePerformersPositions={updatePerformersPositions}
                backgroundImageSrc={backgroundImageSrc}
              />
            </Row>
            <Row>
              <PlayControlsComponent
                toggleShowPlaying={toggleShowPlaying}
                onSlide={handleCountSliderChange}
                maxCount={Object.keys(show.countPositions).length - 1} // '-1' because count is 0 indexed
                addCount={addCountCallback}
                sliderPosition={sliderPosition}
                showPlaying={showPlaying}
              />
            </Row>
          </Content>
          <Sider
            theme="light"
            width={(windowSize.width - config.canvasWidth) / 2}
          >
            <Menu defaultSelectedKeys={["1"]} mode="inline" />
          </Sider>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
