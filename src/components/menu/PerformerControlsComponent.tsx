import React from "react";
import { Layout, Button, Flex, Tooltip } from "antd";
import config from "../../config/AppConfig";

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
  return (
    <Sider
      width={(props.windowSize.width - config.canvasWidth) / 2}
      theme="light"
    >
      <Flex gap="small" vertical>
        <Flex gap="small" justify={"center"} style={{ marginTop: "10px" }}>
          <Button type="primary" onClick={props.positionPerformersInLine}>
            Position Performers In a Line
          </Button>
        </Flex>
        <Flex gap="small" justify={"center"}>
          <Tooltip title="Ctrl + z">
            <Button onClick={props.undoOnClick} type="primary">
              Undo
            </Button>
          </Tooltip>
          <Tooltip title="Ctrl + y">
            <Button onClick={props.redoOnClick} type="primary">
              Redo
            </Button>
          </Tooltip>
        </Flex>
      </Flex>
    </Sider>
  );
};

export default PerformerControlsComponent;
