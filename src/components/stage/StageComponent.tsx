import React from "react";
import { Stage, Layer } from "react-konva";
import PerformerComponent from "./PerformerComponent";
import BackgroundComponent from "./BackgroundComponent";
import config from "../../config/AppConfig";
import { Show } from "../../types/Show";
import SelectorComponent from "./SelectorComponent";
import { KonvaEventObject } from "konva/lib/Node";
import { SelectorPosition } from "../../types/SelectorPosition";
import utils from "../../utils/Utils";
import { useState } from "react";
import PerformerGroupComponent from "./PerformerGroupComponent";
import { Performer } from "../../types/Performer";

export interface StageComponentProps {
  width: number;
  height: number;
  show?: Show;
  count: number;
  updatePosition: (id: string, x: number, y: number) => void;
  selectorPosition?: SelectorPosition;
  selectPerformers: (selectorPosition: SelectorPosition) => boolean;
  updatePerformerGroupPosition: (performers: Performer[]) => void;
}

const StageComponent: React.FC<StageComponentProps> = (props: StageComponentProps) => {
  const [selectorPosition, setSelectorPosition] = useState<SelectorPosition>({positionNow: {x: -1, y: -1}, positionStart: {x: -1, y: -1}});
  const [selectionMade, setSelectionMade] = useState<boolean>(false);
  const [draggingGroup, setDraggingGroup] = useState<boolean>(false);

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
    if(draggingGroup)
    {
      setDraggingGroup(false);
    }
    else
    {
      if(props.selectPerformers(selectorPosition))
      {
        setSelectionMade(true);
      }
      else
      {
        setSelectionMade(false);
      }
    }
    
    setSelectorPosition(noSelectionSelector);
  };


  const onMouseDown = (mouseEvent: KonvaEventObject<MouseEvent>): void => {
    let intersected = false;
    const target = mouseEvent.target;
    target.getLayer()?.children.forEach(function (child) {
      if(utils.hasIntersection(child.getClientRect(), target.getClientRect())) {
        intersected = true;
      }
    });

    if(intersected)
    {
      if(selectionMade)
      {
        if(target.attrs.image.src.includes("PerformerEmojiHighlighted"))
        {
          setDraggingGroup(true);
        }
        else
        {
          props.selectPerformers(noSelectionSelector);
          setSelectionMade(false);
        }
      }
    }
    else
    {
      props.selectPerformers(noSelectionSelector);
      setSelectorPosition({
        positionNow: { x: -1, y: -1 },
        positionStart: { x: mouseEvent.evt.offsetX, y: mouseEvent.evt.offsetY },
      });
    }
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
          <PerformerGroupComponent 
            performers={props.show?.countPositions[props.count]?.filter((performer) => performer.selected)}
            updatePosition={props.updatePosition} 
            updatePerformerGroupPosition={props.updatePerformerGroupPosition}
          />
          {props.show?.countPositions[props.count]?.filter((performer) => !performer.selected).map((performer) => (
            <PerformerComponent
              key={performer.id}
              performer={performer}
              imageSrc={performer.selected ? config.performerImageHighlightedSrc : config.performerImageSrc}
              onUpdatePosition={props.updatePosition}
              selected={performer.selected}
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
