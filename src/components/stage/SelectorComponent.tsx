import React from "react";
import { Rect } from "react-konva";
import { SelectorPosition } from "../../types/SelectorPosition";
import utils from "../../utils/Utils";

interface SelectorComponentProps {
  selectorPosition?: SelectorPosition;
}

const SelectorComponent: React.FC<SelectorComponentProps> = (props: SelectorComponentProps) => {
  if(!utils.selectionCompleted(props.selectorPosition) || props.selectorPosition === undefined)
  {
    return <></>;
  }
  else
  {

    return (
      <Rect 
        x={props.selectorPosition.positionStart.x} 
        y={props.selectorPosition.positionStart.y} 
        width={props.selectorPosition.positionNow.x-props.selectorPosition.positionStart.x} 
        height={props.selectorPosition.positionNow.y-props.selectorPosition.positionStart.y} 
        dash={[2,2]} 
        stroke='red'
        />
    );
  }
};

export default SelectorComponent;
