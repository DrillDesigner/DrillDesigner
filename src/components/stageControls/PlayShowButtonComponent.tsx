import { Slider } from "antd";
import React from "react";
import type { SliderSingleProps } from "antd";
import { Button, Flex, Segmented } from "antd";

interface PlayButtonComponentProps {
  playShow: () => void;
}

const PlayShowButtonComponent: React.FC<PlayButtonComponentProps> = ({
  playShow,
}) => {
  return <Button onClick={playShow}>Play Show</Button>;
};

export default PlayShowButtonComponent;
