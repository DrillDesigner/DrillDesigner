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

  let maxMark = props.maxCount-1;
  const marks: Record<number, string> = {};
  for (let i = 0; i <= maxMark; i++) {
    marks[i] = i.toString();
  }

  return (
    <Slider
      range
      style={sliderStyle}
      marks={marks}
      defaultValue={[0, props.maxCount - 1]}
      min={0}
      max={maxMark}
      onChange={handleSlide}
    />
  );
};

export default CountSliderComponent;
