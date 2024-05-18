import React, { useRef, useEffect, useState } from "react";
import Konva from "konva";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";
import { Performer } from "../types/Performer";
import config from "../config/AppConfig";

interface PerformerComponentProps {
  performer: Performer;
  imageSrc: string;
  onUpdatePosition: (id: string, x: number, y: number) => void; // this updates the position saved in the Show object
}

const PerformerComponent: React.FC<PerformerComponentProps> = ({
  performer,
  imageSrc,
  onUpdatePosition,
}) => {
  const [image] = useImage(imageSrc);
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
      const offsetX = relativePosition.x;
      const offsetY = relativePosition.y;

      const newX = pointerPosition.x - offsetX;
      const newY = pointerPosition.y - offsetY;

      onUpdatePosition(performer.id, newX, newY);
    }
    setSelected(false);
  };

  return (
    <>
      <Image
        x={performer.x}
        y={performer.y}
        image={image}
        draggable
        onDragEnd={handleDragEnd}
        onClick={handleSelect}
        onDragStart={handleDragStart}
        onTap={handleSelect}
        width={20}
        height={20}
      />
    </>
  );
};

export default PerformerComponent;
