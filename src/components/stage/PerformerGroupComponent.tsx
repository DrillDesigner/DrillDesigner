import React, { useRef, useEffect, useState } from "react";
import Konva from "konva";
import { Image, Transformer, Group } from "react-konva";
import useImage from "use-image";
import { Performer } from "../../types/Performer";
import config from "../../config/AppConfig";
import PerformerComponent from "./PerformerComponent";

interface PerformerGroupComponentProps {
  performers?: Performer[];
  updatePosition: (id: string, x: number, y: number) => void;
}

const PerformerGroupComponent: React.FC<PerformerGroupComponentProps> = (props: PerformerGroupComponentProps) => {
  const [isSelected, setSelected] = useState(false);
  const handleSelect = () => {
    setSelected(true);
  };

  const offsetFromPointer: { [key: string]: { xOffset: number; yOffset: number } } = {};
  const handleDragStart = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const pointerPosition = stage!.getPointerPosition();
    const relativePosition = event.target.getRelativePointerPosition();
    props.performers?.forEach((performer) => {
        offsetFromPointer[performer.id] = {xOffset: performer.x - pointerPosition!.x, yOffset: performer.y - pointerPosition!.y};
    });
  };

  const handleDragEnd = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const pointerPosition = stage!.getPointerPosition();
    const relativePosition = event.target.getRelativePointerPosition();

    if (pointerPosition && relativePosition) {
      const newX = pointerPosition.x - relativePosition.x;
      const newY = pointerPosition.y - relativePosition.y;
      
      props.performers?.forEach((performer) => {
        props.updatePosition(performer.id, newX, newY);      
      });
    }
    setSelected(false);
  };

  return (
    <Group 
      draggable
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      x={0}
      y={0}>
    {props.performers?.map((performer) => (
        <PerformerComponent
          key={performer.id}
          performer={performer}
          imageSrc={performer.selected ? config.performerImageHighlightedSrc : config.performerImageSrc}
          onUpdatePosition={props.updatePosition}
          selected={performer.selected}
        />
    ))}     
         
    </Group>
  );
};

export default PerformerGroupComponent;
