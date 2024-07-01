import React from "react";
import { Layout, Menu } from "antd";
import config from "../../config/AppConfig";
import { MenuProps } from "antd";

const { Sider } = Layout;

interface PerformerControlsComponentProps {
  windowSize: { width: number; height: number };
  positionPerformersInLine: () => void;
  undoOnClick: () => void;
  redoOnClick: () => void;
}

const PerformerControlsComponent: React.FC<PerformerControlsComponentProps> = (
  props: PerformerControlsComponentProps,
) => {
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "Position Performers in Line",
      onClick: props.positionPerformersInLine,
    },
    {
      key: "undo",
      label: "Undo",
      onClick: props.undoOnClick,
    },
    {
      key: "redo",
      label: "Redo",
      onClick: props.redoOnClick,
    },
  ];

  return (
    <Sider
      width={(props.windowSize.width - config.canvasWidth) / 2}
      theme="light"
    >
      <Menu items={items} />
    </Sider>
  );
};

export default PerformerControlsComponent;
