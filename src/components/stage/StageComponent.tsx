import React from "react";
import { Stage, Layer, Rect } from "react-konva";
import PerformerComponent from "./PerformerComponent";
import BackgroundComponent from "./BackgroundComponent";
import config from "../../config/AppConfig";
import { Show } from "../../types/Show";
import SelectorComponent from "./SelectorComponent";
import { KonvaEventObject } from "konva/lib/Node";
import { SelectorPosition } from "../../types/SelectorPosition";
import utils from "../../utils/Utils";
import { useState } from "react";

export interface StageComponentProps {
  width: number;
  height: number;
  show?: Show;
  count: number;
  updatePosition: (id: string, x: number, y: number) => void;
  selectorPosition?: SelectorPosition;
}

const StageComponent: React.FC<StageComponentProps> = (props: StageComponentProps) => {
  const [selectorPosition, setSelectorPosition] = useState<SelectorPosition>({positionNow: {x: -1, y: -1}, positionStart: {x: -1, y: -1}});

  // selector will not render
  const noSelectionSelector: SelectorPosition = {positionStart: {x: -1, y: -1}, positionNow: {x: -1, y: -1}};

  const onSelectorMove = (mouseEvent: KonvaEventObject<MouseEvent>): void => {
    if(selectorPosition.positionStart.x !== -1 && selectorPosition.positionStart.y !== -1)
    {
      const positionToSet: SelectorPosition = {
        positionNow: {x: mouseEvent.evt.offsetX, y: mouseEvent.evt.offsetY},
        positionStart: selectorPosition.positionStart,
      };
      setSelectorPosition(positionToSet);
    }
  };

  const onMouseUp = (): void =>  {
    setSelectorPosition(noSelectionSelector);
  };

  const onMouseDown = (mouseEvent: KonvaEventObject<MouseEvent>): void => {
    // if a performer is selected i.e. a layer's child and this mouse intersect, don't draw the selector square
    const target = mouseEvent.target;
    target.getLayer()?.children.forEach(function (child) {
      if(utils.hasIntersection(child.getClientRect(), target.getClientRect())) {
        setSelectorPosition(noSelectionSelector);
      }
      else {
        setSelectorPosition({
          positionNow: { x: -1, y: -1 },
          positionStart: { x: mouseEvent.evt.offsetX, y: mouseEvent.evt.offsetY },
        });
      }
    });
  };

  const onMouseLeave = (): void => {
    setSelectorPosition(noSelectionSelector);
  };
  

  
  return (
    <div
      style={{
        borderBottom: "2px solid #ddebe9",
        display: "inline-block",
      }}
    >
      <Stage 
        width={props.width} 
        height={props.height} 
        onMouseLeave={onMouseLeave}
        onMouseDown={onMouseDown}
        onMouseMove={onSelectorMove}
        onMouseUp={onMouseUp}>
        <Layer>
          <BackgroundComponent
            imageSrc={config.backgroundImageSrc}
            width={props.width}
            height={props.height}
          />
          {props.show?.countPositions[props.count]!.map((performer) => (
            <PerformerComponent
              key={performer.id}
              performer={performer}
              imageSrc={config.performerImageSrc}
              onUpdatePosition={props.updatePosition}
            />
          ))}
          <SelectorComponent 
            selectorPosition={selectorPosition}
            />
        </Layer>
      </Stage>
    </div>
  );
};

export default StageComponent;
