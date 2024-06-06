import { Slider } from "antd";
import React from "react";
import type { SliderSingleProps } from "antd";
import { Button, Flex, Segmented } from "antd";
import { useState, useEffect } from "react";
import CountSliderComponent from "./CountSliderComponent";

interface PlayControlsComponentProps {
  playShow: () => void;
  onSlide: (value: number[]) => void;
  maxCount: number;
  addCount: () => void;
  sliderPosition: number[];
}

export const usePlayControlsState = (initialSliderPosition: number[]) => {
  const [sliderPosition, setSliderPosition] = useState<number[]>(initialSliderPosition);
  
  return {
    sliderPosition,
    setSliderPosition
  }
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
      <Button onClick={props.addCount}>Add Count</Button>
      <CountSliderComponent 
        onSlide={props.onSlide} 
        maxCount={props.maxCount} 
        sliderPosition={props.sliderPosition} 
      />
    </Flex>
  );
};

export default PlayControlsComponent;
