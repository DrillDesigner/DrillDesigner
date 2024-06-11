import React, { useRef, useEffect, useState } from "react";
import Konva from "konva";
import { Image, Transformer, Rect } from "react-konva";
import { SelectorPosition } from "../../types/SelectorPosition";

interface SelectorComponentProps {
  selectorPosition?: SelectorPosition;
}

const SelectorComponent: React.FC<SelectorComponentProps> = (props: SelectorComponentProps) => {
  if(props.selectorPosition === undefined || (props.selectorPosition.positionNow.x === -1 && props.selectorPosition.positionNow.y === -1 && props.selectorPosition.positionStart.x === -1 && props.selectorPosition.positionStart.y === -1))
  {
    return <></>;
  }
  else
  {
    return (
      <Rect  // TODO: handle draw logic if user drags left and up
        x={props.selectorPosition.positionStart.x} 
        y={props.selectorPosition.positionStart.y} 
        width={props.selectorPosition.positionStart.x-props.selectorPosition.positionNow.x} 
        height={props.selectorPosition.positionStart.y-props.selectorPosition.positionNow.y} 
        dash={[2,2]} />
  );
  }
};

export default SelectorComponent;
