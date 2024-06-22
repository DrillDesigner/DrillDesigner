import React, { useRef, useEffect, useState } from "react";
import Konva from "konva";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import { Performer } from "../../types/Performer";
import config from "../../config/AppConfig";

interface PerformerComponentProps {
  performer: Performer;
  imageSrc: string;
  onUpdatePosition: (id: string, x: number, y: number) => void; // this updates the position saved in the Show object
  selected: boolean;
}

const PerformerComponent: React.FC<PerformerComponentProps> = (props: PerformerComponentProps) => {
  const [image] = useImage(props.imageSrc);
  const [isSelected, setSelected] = useState(false);

  const handleSelect = () => {
    setSelected(true);
  };

  const handleDragStart = (event: Konva.KonvaEventObject<MouseEvent>) => {};

  const handleDragEnd = (event: Konva.KonvaEventObject<MouseEvent>) => {
    const stage = event.target.getStage();
    const pointerPosition = stage!.getPointerPosition();
    const relativePosition = event.target.getRelativePointerPosition();

    if (pointerPosition && relativePosition) {
      const newX = pointerPosition.x - relativePosition.x;
      const newY = pointerPosition.y - relativePosition.y;

      props.onUpdatePosition(props.performer.id, newX, newY);
      console.log(newX, newY);
    }
    
    setSelected(false);
  };

  return (
    <>
    {props.performer.id === '0' && props.performer.selected && console.log(props.performer.x, props.performer.y)}
      <Image
        x={props.performer.x}
        y={props.performer.y}
        image={image}
        selected={props.selected}
        draggable={!props.selected} // if selected, the individual performer shouldn't be draggable, only the group
        onDragEnd={handleDragEnd}
        onClick={handleSelect}
        onDragStart={handleDragStart}
        onTap={handleSelect}
        width={config.performerSize}
        height={config.performerSize}
      />
    </>
  );
};

export default PerformerComponent;
