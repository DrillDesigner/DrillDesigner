import { Slider } from "antd";
import React from "react";
import type { SliderSingleProps } from "antd";

interface CountSliderProps {
  onSlide: (value: number[]) => void;
  maxCount: number;
}

const sliderStyle: React.CSSProperties = {
  width: "75%",
};

const CountSliderComponent: React.FC<CountSliderProps> = (
  props: CountSliderProps,
) => {
  const handleSlide = (value: number[]) => {
    props.onSlide(value);
  };

  const marks: SliderSingleProps["marks"] = {
    0: "0",
    maxCount: props.maxCount.toString(),
  };

  return (
    <Slider
      range
      style={sliderStyle}
      marks={marks}
      defaultValue={[0, props.maxCount - 1]}
      min={0}
      max={props.maxCount - 1}
      onChange={handleSlide}
    />
  );
};

export default CountSliderComponent;
