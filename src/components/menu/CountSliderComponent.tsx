import { Slider } from "antd";
import React from "react";
import type { SliderSingleProps } from 'antd';

interface CountSliderProps {
  onSlide: (value: number[]) => void;
}

const marks: SliderSingleProps['marks'] = {
  0: '0',
  100: '100'
};

const sliderStyle: React.CSSProperties = {
  width: '75%',
};

const CountSliderComponent: React.FC<CountSliderProps> = ({ onSlide }) => {
  const handleSlide = (value: number[]) => {
    onSlide(value);
  };

  return <Slider range style={sliderStyle} marks={marks} defaultValue={[0, 100]} onChange={handleSlide}/>;
};

export default CountSliderComponent;
