import { Slider } from "antd";
import React from "react";

interface CountSliderProps {
  onSlide: (value: number) => void;
}

const CountSliderComponent: React.FC<CountSliderProps> = ({ onSlide }) => {
  const handleSlide = (value: number) => {
    onSlide(value);
  };

  return <Slider defaultValue={0} min={0} max={5} onChange={handleSlide} />;
};

export default CountSliderComponent;
