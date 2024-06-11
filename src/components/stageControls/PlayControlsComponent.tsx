import { Slider } from "antd";
import React from "react";
import type { SliderSingleProps } from "antd";
import { Button, Flex, Segmented } from "antd";
import { useState, useEffect } from "react";
import CountSliderComponent from "./CountSliderComponent";
import PlayButtonComponent from "./PlayButtonComponent";

interface PlayControlsComponentProps {
  toggleShowPlaying: () => void;
  onSlide: (value: number[]) => void;
  maxCount: number;
  addCount: () => void;
  sliderPosition: number[];
  showPlaying: boolean;
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
      <PlayButtonComponent
        toggleShowPlayingOnClick={props.toggleShowPlaying}
        showPlaying={props.showPlaying}
      ></PlayButtonComponent>
      <Button onClick={props.addCount}>Add Count</Button>
      <CountSliderComponent
        onCountSliderValueChange={props.onSlide}
        maxCount={props.maxCount}
        sliderPosition={props.sliderPosition}
      />
    </Flex>
  );
};

export default PlayControlsComponent;
