import React from "react";
import { Stage, Layer } from "react-konva";
import PerformerComponent from "./PerformerComponent";
import BackgroundComponent from "./BackgroundComponent";
import config from "../../config/AppConfig";
import { Show } from "../../types/Show";
import SelectorComponent from "./SelectorComponent";
import { KonvaEventObject } from "konva/lib/Node";
import { SelectorPosition } from "../../types/SelectorPosition";

export interface StageComponentProps {
  width: number;
  height: number;
  show?: Show;
  count: number;
  updatePosition: (id: string, x: number, y: number) => void;
  onSelectorMouseUp: (mouseEvent: KonvaEventObject<MouseEvent>) => void;
  onSelectorMouseDown: (mouseEvent: KonvaEventObject<MouseEvent>) => void;
  onSelectorMove: (mouseEvent: KonvaEventObject<MouseEvent>) => void;
  selectorPosition?: SelectorPosition;
}

const StageComponent: React.FC<StageComponentProps> = (props: StageComponentProps) => {
  return (
    <div
      style={{
        borderBottom: "2px solid #ddebe9",
        display: "inline-block",
      }}
    >
      <Stage width={props.width} height={props.height}>
        <Layer>
          <BackgroundComponent
            imageSrc={config.backgroundImageSrc}
            width={props.width}
            height={props.height}
            onSelectorMouseDown={props.onSelectorMouseDown}
            onSelectorMove={props.onSelectorMove}
            onSelectorMouseUp={props.onSelectorMouseUp}
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
            selectorPosition={props.selectorPosition}
            />
        </Layer>
      </Stage>
    </div>
  );
};

export default StageComponent;
