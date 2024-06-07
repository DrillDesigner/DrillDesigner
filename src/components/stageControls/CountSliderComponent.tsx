import { Slider } from "antd";
import React from "react";

interface CountSliderProps {
  onSlide: (value: number[]) => void;
  maxCount: number;
  sliderPosition: number[];
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
      min={0}
      max={maxMark}
      onChange={handleSlide}
      value={props.sliderPosition}
    />
  );
};

export default CountSliderComponent;
