import { Slider } from "antd";
import React from "react";
import type { SliderSingleProps } from "antd";
import { Button, Flex, Segmented } from "antd";
import CountSliderComponent from "./CountSliderComponent";

interface PlayControlsComponentProps {
  playShow: () => void;
  onSlide: (value: number[]) => void;
  maxCount: number;
}

const PlayControlsComponent: React.FC<PlayControlsComponentProps> = (
  props: PlayControlsComponentProps,
) => {
  return (
    <Flex
      style={{
        width: "100%",
        height: "100%",
      }}
      justify={"space-around"}
      align={"center"}
    >
      <Button onClick={props.playShow}>Play Show</Button>
      <Button>Add Count</Button>
      <CountSliderComponent onSlide={props.onSlide} maxCount={props.maxCount} />
    </Flex>
  );
};

export default PlayControlsComponent;
