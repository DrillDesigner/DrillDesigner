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

  const handleSliderDivOnClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    // // if it's a click in the middle of a bar, handle the logic accordingly so only the middle one moves.
    // // else, do logic above
    if(event.type === "click")
    {
      if (target.classList.contains("ant-slider-handle-1")) {
        props.onCountSliderValueChange([props.sliderPosition[0], props.sliderPosition[0], props.sliderPosition[2]]);
      }
      else if (target.classList.contains("ant-slider-handle-3")) {
        props.onCountSliderValueChange([props.sliderPosition[0], props.sliderPosition[2], props.sliderPosition[2]]);
      }

    }
  };

  return (
    <div style={{
      width: "80%",
      justifyContent: "space-around",
      display: "flex",
    }}
    
    onClick={handleSliderDivOnClick}>
      <Slider
        range
        style={{ width: "100%", display: "flex" }}
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
    </div>
  );
};

export default CountSliderComponent;
