import { Slider } from "antd";
import React from "react";

interface CountSliderProps {
  onCountSliderValueChange: (value: number[]) => void;
  maxCount: number;
  sliderPosition: number[];
}

const CountSliderComponent: React.FC<CountSliderProps> = (
  props: CountSliderProps,
) => {
  const marks: Record<number, string> = {};
  for (let i = 0; i <= props.maxCount; i++) {
    marks[i] = i.toString();
  }

  return (
    <Slider
      range
      style={{ width: "75%" }}
      marks={marks}
      min={0}
      max={props.maxCount}
      onChange={props.onCountSliderValueChange}
      value={props.sliderPosition}
      tooltip={{
        formatter: (value: number | undefined) => {
          if (value === props.sliderPosition[0]) {
            return "Beginning of segment";
          }
          if (value === props.sliderPosition[1]) {
            return "Current count position: " + value;
          }
          if (value === props.sliderPosition[2]) {
            return "End of segment";
          }
          return null;
        },
      }}
    />
  );
};

export default CountSliderComponent;
